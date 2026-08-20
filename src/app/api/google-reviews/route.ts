import { NextResponse } from "next/server";

export type GoogleReview = {
  authorName: string;
  authorPhotoUrl: string | null;
  rating: number;
  text: string;
  relativeTime: string;
};

export type GoogleReviewsResponse = {
  configured: boolean;
  rating: number | null;
  reviewCount: number | null;
  reviews: GoogleReview[];
  /** True when today's call budget has been used up and this response
   *  is being served from the last successful fetch rather than fresh. */
  throttled?: boolean;
};

const NOT_CONFIGURED: GoogleReviewsResponse = {
  configured: false,
  rating: null,
  reviewCount: null,
  reviews: [],
};

// How many times this route will actually call Google in a single day
// before cutting itself off for the rest of that day, regardless of how
// much traffic the page gets. Deliberately well under Google's free
// monthly allowance for this field tier (see .env.example) so normal
// traffic never gets close, with headroom to spare even on a busy day.
// Override with GOOGLE_PLACES_DAILY_CALL_LIMIT if you ever want it
// tighter or looser.
const DAILY_CALL_LIMIT = Number(process.env.GOOGLE_PLACES_DAILY_CALL_LIMIT ?? 20);

// One hour -- reviews don't change often enough to justify a fresh
// call on every page view. This is our own explicit cache (rather than
// relying only on Next's fetch cache) so the daily counter below can
// reason about it directly: a cache hit costs zero calls to Google.
const CACHE_TTL_MS = 60 * 60 * 1000;

// Module-level state persists for the life of one server instance.
// IMPORTANT HONEST CAVEAT: on serverless hosts (Vercel and similar),
// each function instance can be recycled or run in parallel across
// regions, which resets or fragments this state -- so this counter is
// a genuinely useful *extra* safety layer, not a mathematically
// guaranteed one. The one guarantee that holds regardless of hosting
// is a quota cap set in Google Cloud Console itself (APIs & Services ->
// Places API (New) -> Quotas), which Google's own infrastructure
// enforces no matter how this route's memory behaves. Set both; this
// one catches everyday spikes without waiting on Google's side, and
// the Console quota is the real backstop if this one ever gets reset.
let cache: { data: GoogleReviewsResponse; fetchedAt: number } | null = null;
let dailyCallCount = 0;
let dailyCountDate = "";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10); // UTC calendar day
}

/**
 * Fetches live reviews from Google's official Places API (New) for the
 * place configured via GOOGLE_PLACE_ID. Google's API returns a maximum
 * of 5 reviews per place regardless of how many the listing actually
 * has -- that's a Google-side limit, not something this route can
 * change. The API key never reaches the browser: this route runs
 * server-side and the client component just calls this same-origin
 * endpoint.
 */
export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json<GoogleReviewsResponse>(NOT_CONFIGURED);
  }

  const now = Date.now();

  // Serve from our own cache if it's still fresh. This costs zero
  // calls to Google and doesn't touch the daily counter at all.
  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json(cache.data);
  }

  // Reset the daily counter when the calendar day rolls over (UTC).
  const today = todayKey();
  if (dailyCountDate !== today) {
    dailyCountDate = today;
    dailyCallCount = 0;
  }

  // Daily cutoff: stop calling Google for the rest of today. Serve the
  // last real data this instance fetched (even if a bit stale) rather
  // than dropping back to the plain link-out card -- visitors still
  // see genuine reviews, just not brand-new ones until the count
  // resets tomorrow.
  if (dailyCallCount >= DAILY_CALL_LIMIT) {
    if (cache) {
      return NextResponse.json<GoogleReviewsResponse>({
        ...cache.data,
        throttled: true,
      });
    }
    return NextResponse.json<GoogleReviewsResponse>({
      ...NOT_CONFIGURED,
      throttled: true,
    });
  }

  try {
    dailyCallCount++;

    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount,reviews`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        // Our own cache above already governs revalidation, so this
        // call is intentionally never cached a second time by Next.
        cache: "no-store",
      }
    );

    if (!res.ok) {
      // Log Google's actual error body server-side (terminal in local
      // dev, or your host's function logs in production) -- this is
      // where the real reason lives: wrong key, API not enabled on
      // this project, wrong Place ID, billing not active, etc. Never
      // sent to the browser, since the client only sees the safe
      // NOT_CONFIGURED fallback shape below.
      const errorBody = await res.text().catch(() => "(no body)");
      console.error(
        `[google-reviews] Places API request failed: ${res.status} ${res.statusText}\n${errorBody}`
      );
      throw new Error(`Places API responded ${res.status}`);
    }

    const data = await res.json();

    const reviews: GoogleReview[] = (data.reviews ?? []).map(
      (r: {
        authorAttribution?: { displayName?: string; photoUri?: string };
        rating?: number;
        text?: { text?: string };
        relativePublishTimeDescription?: string;
      }) => ({
        authorName: r.authorAttribution?.displayName ?? "Google user",
        authorPhotoUrl: r.authorAttribution?.photoUri ?? null,
        rating: r.rating ?? 0,
        text: r.text?.text ?? "",
        relativeTime: r.relativePublishTimeDescription ?? "",
      })
    );

    const result: GoogleReviewsResponse = {
      configured: true,
      rating: data.rating ?? null,
      reviewCount: data.userRatingCount ?? null,
      reviews,
    };

    cache = { data: result, fetchedAt: now };
    return NextResponse.json(result);
  } catch (err) {
    // If Google's API has a hiccup, serve the last good cache if we
    // have one; otherwise fail quietly into the same shape the client
    // treats as "not configured" -- the UI falls back to the plain
    // link-out card rather than showing a visible error. The real
    // reason still gets logged server-side above (or here, for errors
    // that aren't an HTTP failure -- e.g. a network issue) so you can
    // actually diagnose it instead of just seeing "not working."
    if (err instanceof Error && !err.message.startsWith("Places API responded")) {
      console.error("[google-reviews] Unexpected error:", err);
    }
    if (cache) {
      return NextResponse.json<GoogleReviewsResponse>(cache.data);
    }
    return NextResponse.json<GoogleReviewsResponse>(NOT_CONFIGURED);
  }
}