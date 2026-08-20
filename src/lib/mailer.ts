import nodemailer from "nodemailer";
import { siteInfo } from "./siteInfo";

/**
 * Sends a new trip inquiry straight to the business inbox by email, using
 * a regular Gmail account over SMTP -- no separate email-service signup
 * needed.
 *
 * SETUP (one-time, takes about 2 minutes):
 *   1. Turn on 2-Step Verification on the Gmail account that should
 *      receive these (Google Account -> Security -> 2-Step Verification).
 *   2. Create an "App Password": Google Account -> Security -> App
 *      Passwords -> choose "Mail" -> Generate. Copy the 16-character code.
 *   3. In your hosting provider's environment variables (and in
 *      .env.local for local dev), set:
 *        EMAIL_USER=ceylonvantage@gmail.com
 *        EMAIL_APP_PASSWORD=the16charactercodefromstep2
 *        EMAIL_TO=ceylonvantage@gmail.com   (optional -- defaults to EMAIL_USER)
 *      See .env.example.
 *
 * If these aren't configured yet, sendInquiryEmail() throws, and the API
 * route below reports a clear error instead of silently losing the
 * inquiry.
 */

const FIELD_LABELS: Record<string, string> = {
  name: "Full name",
  email: "Email",
  whatsapp: "WhatsApp number",
  country: "Country",
  arrivalDate: "Arrival date",
  departureDate: "Departure date",
  travelers: "Number of travelers",
  travelType: "Travel type",
  budget: "Budget range",
  destinations: "Destinations of interest",
  activities: "Activities in mind",
  message: "Additional notes",
};

// Preferred display order -- anything not listed here (shouldn't happen,
// but just in case a field is added to the form later) is appended after.
const FIELD_ORDER = Object.keys(FIELD_LABELS);

function formatInquiryAsHtml(data: Record<string, unknown>): string {
  const orderedKeys = [
    ...FIELD_ORDER.filter((k) => k in data),
    ...Object.keys(data).filter((k) => !FIELD_ORDER.includes(k)),
  ];

  const rows = orderedKeys
    .map((key) => {
      const value = data[key];
      if (value === undefined || value === null || value === "") return "";
      return `
        <tr>
          <td style="padding:8px 16px;font-weight:600;color:#1f3b3a;white-space:nowrap;vertical-align:top;">${
            FIELD_LABELS[key] ?? key
          }</td>
          <td style="padding:8px 16px;color:#2b2b28;">${String(value).replace(
            /</g,
            "&lt;"
          )}</td>
        </tr>`;
    })
    .join("");

  return `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1f3b3a;">New trip inquiry — Ceylon Vantage</h2>
      <table style="border-collapse:collapse;width:100%;">${rows}</table>
      <p style="margin-top:24px;color:#6b6b63;font-size:13px;">
        Sent automatically from the "Plan Your Trip" form on the website.
      </p>
    </div>`;
}

function formatInquiryAsText(data: Record<string, unknown>): string {
  const orderedKeys = [
    ...FIELD_ORDER.filter((k) => k in data),
    ...Object.keys(data).filter((k) => !FIELD_ORDER.includes(k)),
  ];
  return orderedKeys
    .filter((k) => data[k] !== undefined && data[k] !== null && data[k] !== "")
    .map((k) => `${FIELD_LABELS[k] ?? k}: ${data[k]}`)
    .join("\n");
}

export async function sendInquiryEmail(data: Record<string, unknown>) {
  const { EMAIL_USER, EMAIL_APP_PASSWORD, EMAIL_TO } = process.env;

  if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
    throw new Error(
      "EMAIL_USER / EMAIL_APP_PASSWORD are not set. Add them to .env.local " +
        "(dev) or your hosting provider's environment variables " +
        "(production) so inquiries can be emailed. See .env.example."
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: EMAIL_USER, pass: EMAIL_APP_PASSWORD },
  });

  const nameForSubject =
    typeof data.name === "string" && data.name.trim() ? data.name.trim() : "a traveler";

  const recipient = EMAIL_TO || EMAIL_USER || siteInfo.email;
  console.log(`📧 [Mailer] Sending inquiry email to: ${recipient} (From: ${EMAIL_USER})`);

  const info = await transporter.sendMail({
    from: `"Ceylon Vantage Website" <${EMAIL_USER}>`,
    to: recipient,
    replyTo: typeof data.email === "string" ? data.email : undefined,
    subject: `New trip inquiry from ${nameForSubject}`,
    text: formatInquiryAsText(data),
    html: formatInquiryAsHtml(data),
  });

  console.log(`✅ [Mailer] Email dispatched successfully! Message ID: ${info.messageId} | Recipient: ${recipient}`);
  return info;
}
