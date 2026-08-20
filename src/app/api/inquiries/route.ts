import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmail } from "@/lib/mailer";

// --- Basic in-memory rate limiting ---------------------------------
// Not a substitute for edge/WAF-level protection, but stops naive
// scripted abuse of the public inquiry endpoint without needing any
// extra infrastructure. Resets on cold start / redeploy, which is an
// acceptable trade-off for a low-traffic contact form.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

// Reasonable upper bounds on each field so a malicious payload can't
// blow up the email/DB write with megabytes of text.
const MAX_FIELD_LENGTH: Record<string, number> = {
  name: 120,
  email: 200,
  whatsapp: 40,
  country: 80,
  arrivalDate: 20,
  departureDate: 20,
  travelers: 10,
  travelType: 60,
  budget: 60,
  destinations: 500,
  activities: 500,
  message: 2000,
};

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    console.warn(`⚠️ [API /api/inquiries] Rate limit hit for IP: ${ip}`);
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    console.warn(`⚠️ [API /api/inquiries] Malformed JSON payload received from IP: ${ip}`);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: a field that's invisible to real visitors (see InquiryForm)
  // but that simple bots tend to fill in automatically. If it has any
  // value, silently pretend success rather than tipping the bot off.
  if (typeof body._bot_check === "string" && body._bot_check.trim() !== "") {
    console.warn(`🤖 [API /api/inquiries] Honeypot triggered (_bot_check: "${body._bot_check}"). Skipping email.`);
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const required = ["name", "email", "whatsapp", "country"];
  const missing = required.filter((field) => !body[field]);

  if (missing.length > 0) {
    console.warn(`⚠️ [API /api/inquiries] Missing required fields: ${missing.join(", ")}`);
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  // Basic email sanity check
  const email = String(body.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.warn(`⚠️ [API /api/inquiries] Invalid email format: "${email}"`);
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Enforce length caps and strip the honeypot field before it's ever
  // logged, emailed, or stored.
  delete body._bot_check;
  delete body.company;
  for (const [key, value] of Object.entries(body)) {
    if (typeof value !== "string") continue;
    const max = MAX_FIELD_LENGTH[key] ?? 300;
    if (value.length > max) {
      console.warn(`⚠️ [API /api/inquiries] Field "${key}" exceeds max length (${value.length}/${max})`);
      return NextResponse.json(
        { error: `${key} is too long.` },
        { status: 400 }
      );
    }
  }

  console.log(`📨 [API /api/inquiries] New inquiry submitted by: ${body.name} <${body.email}> (WhatsApp: ${body.whatsapp})`);

  // Email is the primary delivery path -- this is what actually gets read.
  // If it's not configured correctly, fail loudly so the site owner
  // notices during setup rather than silently losing inquiries.
  try {
    await sendInquiryEmail(body);
  } catch (err) {
    console.error("❌ [API /api/inquiries] Failed to send email via SMTP:", err);
    return NextResponse.json(
      {
        error:
          "Could not send your inquiry right now. Please try again, or reach us directly on WhatsApp.",
      },
      { status: 500 }
    );
  }

  // Saving to MongoDB is optional and best-effort -- a convenient backup
  // record, not the primary way inquiries are received. If MONGODB_URI
  // isn't configured, this is skipped entirely and the request still
  // succeeds, since the email above has already been sent.
  if (process.env.MONGODB_URI) {
    try {
      const { default: getMongoClient, DB_NAME } = await import("@/lib/mongodb");
      const client = await getMongoClient();
      const db = client.db(DB_NAME);
      await db.collection("inquiries").insertOne({
        ...body,
        status: "new",
        receivedAt: new Date(),
      });
    } catch (err) {
      console.warn(
        "Inquiry emailed successfully, but the optional MongoDB backup save failed:",
        err
      );
    }
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
