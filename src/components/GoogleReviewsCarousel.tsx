"use client";

import { useEffect, useState } from "react";
import { siteInfo } from "@/lib/siteInfo";
import { GoogleMark } from "./BrandLogos";
import type { GoogleReviewsResponse } from "@/app/api/google-reviews/route";

function Stars({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "lg";
}) {
  const dim = size === "lg" ? "h-5 w-5" : "h-3.5 w-3.5";
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={dim}
          fill={i < Math.round(rating) ? "#f4b400" : "#e5e0d5"}
        >
          <path d="M10 1.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.9L10 14.7l-5.3 2.9 1.1-5.9L1.5 7.6l5.9-.7L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

function QuoteMark() {
  return (
    <svg
      viewBox="0 0 32 24"
      aria-hidden="true"
      className="h-6 w-6 text-vantage-gold/40"
      fill="currentColor"
    >
      <path d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0l1.6 3.6C9.2 5.2 6.8 8 6.8 12h7.6v12H0Zm18 0V14.4c0-8 4.8-13.2 12.8-14.4L32 3.6C26.8 5.2 24.4 8 24.4 12H32v12H18Z" />
    </svg>
  );
}

/**
 * Live Google Reviews showcase for the Reviews page. Fetches from our
 * own /api/google-reviews route (which calls Google's official Places
 * API server-side). Falls back to a plain link-out state if
 * GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID haven't been set yet -- see
 * .env.example for the 5-minute setup.
 *
 * Designed as a full-width showcase (not a small card) with a
 * multi-column grid so several reviews are visible at once. Google's
 * API caps this at 5 reviews per place maximum -- that's a hard
 * Google-side limit, not something this component can lift, so the
 * grid is built to look intentionally full and well-composed with
 * anywhere from 1 to 5 cards rather than assuming a fixed count.
 */
export default function GoogleReviewsCarousel() {
  const [data, setData] = useState<GoogleReviewsResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/google-reviews")
      .then((r) => r.json())
      .then((d: GoogleReviewsResponse) => {
        if (!cancelled) setData(d);
      })
      .catch(() => {
        if (!cancelled) {
          setData({ configured: false, rating: null, reviewCount: null, reviews: [] });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const loading = data === null;
  const connected = data?.configured === true;
  const hasWrittenReviews = connected && data.reviews.length > 0;

  return (
    <div>
      {/* Header -- spread wide: brand mark + title on one side, the
          overall live rating and a write-a-review CTA on the other. */}
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          <GoogleMark className="h-11 w-11 sm:h-12 sm:w-12" />
          <div>
            <p className="font-display text-2xl text-ink-teal sm:text-3xl">
              Google Reviews
            </p>
            <p className="mt-1 font-body text-xs uppercase tracking-wide text-ink-charcoal-soft/60">
              {connected ? "Live from Google" : "Business Profile"}
            </p>
          </div>
        </div>

        {connected && data?.rating != null && (
          <div className="flex items-center gap-5">
            <div className="text-center sm:text-right">
              <p className="font-display text-4xl leading-none text-ink-teal">
                {data.rating.toFixed(1)}
              </p>
              <div className="mt-2 flex justify-center sm:justify-end">
                <Stars rating={data.rating} size="lg" />
              </div>
              {data.reviewCount != null && (
                <p className="mt-1.5 font-body text-xs text-ink-charcoal-soft/60">
                  {data.reviewCount} rating{data.reviewCount === 1 ? "" : "s"}
                </p>
              )}
            </div>
            <a
              href={siteInfo.social.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 rounded-full bg-ink-teal px-5 py-2.5 font-body text-sm font-medium text-soft-white transition hover:bg-ink-teal-deep sm:inline-block"
            >
              Write a review
            </a>
          </div>
        )}
      </div>

      {data?.throttled && (
        <p className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border hairline px-3 py-1 font-body text-[11px] text-ink-charcoal-soft/70">
          <span className="h-1.5 w-1.5 rounded-full bg-vantage-gold" />
          Showing today&apos;s earlier reviews — updates resume tomorrow
        </p>
      )}

      {/* Loading state -- a grid of skeleton cards matching the real layout */}
      {loading && (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-2xl bg-warm-stone"
            />
          ))}
        </div>
      )}

      {/* Written reviews -- multi-column grid so several show at once,
          each with its own quote mark, avatar, and the guest's own
          star rating (separate from the overall rating shown above). */}
      {!loading && hasWrittenReviews && (
        <>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data!.reviews.map((review, i) => (
              <div
                key={i}
                className="animate-fade-in-up card-pop flex flex-col bg-warm-stone p-6"
                style={{ animationDelay: `${i * 90}ms`, animationFillMode: "both" }}
              >
                <QuoteMark />
                <div className="mt-3 flex items-center gap-3">
                  {review.authorPhotoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- external avatar URL from Google, not a local asset next/image can optimize
                    <img
                      src={review.authorPhotoUrl}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-teal/10 font-body text-sm text-ink-teal">
                      {review.authorName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-body text-sm font-medium text-ink-teal">
                      {review.authorName}
                    </p>
                    <Stars rating={review.rating} />
                  </div>
                </div>
                <p className="mt-4 line-clamp-6 flex-1 font-body text-sm leading-relaxed text-ink-charcoal-soft">
                  {review.text}
                </p>
                <p className="mt-4 font-body text-[11px] text-ink-charcoal-soft/50">
                  {review.relativeTime}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href={siteInfo.social.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink-teal px-6 py-2.5 font-body text-sm font-medium text-soft-white transition hover:bg-ink-teal-deep"
            >
              See all reviews &amp; write your own
            </a>
          </div>
        </>
      )}

      {/* Connected, but nobody has left a WRITTEN review yet -- a
          star-only rating with no comment doesn't come back from
          Google's API as review text. Show the live rating cleanly. */}
      {!loading && connected && !hasWrittenReviews && data?.rating != null && (
        <div className="mt-10 flex flex-col items-center gap-2 py-10">
          <Stars rating={data.rating} size="lg" />
          <p className="font-display text-2xl text-ink-teal">
            {data.rating.toFixed(1)}
            <span className="ml-1 font-body text-sm font-normal text-ink-charcoal-soft/60">
              / 5
            </span>
          </p>
          {data.reviewCount != null && (
            <p className="font-body text-xs text-ink-charcoal-soft/60">
              Based on {data.reviewCount} rating{data.reviewCount === 1 ? "" : "s"}
            </p>
          )}
          <a
            href={siteInfo.social.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-fit items-center gap-1.5 font-body text-sm text-ink-teal underline decoration-vantage-gold/50 underline-offset-2 hover:text-vantage-gold"
          >
            Write a review on Google
          </a>
        </div>
      )}

      {!loading && connected && !hasWrittenReviews && data?.rating == null && (
        <div className="mt-10 flex flex-col items-center gap-2 py-10">
          <p className="font-body text-sm text-ink-charcoal-soft/60">
            No reviews yet
          </p>
          <a
            href={siteInfo.social.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-1.5 font-body text-sm text-ink-teal underline decoration-vantage-gold/50 underline-offset-2 hover:text-vantage-gold"
          >
            Be the first to write one
          </a>
        </div>
      )}

      {!loading && !connected && (
        <div className="mt-10 flex flex-col items-center gap-3 py-6 text-center">
          <p className="max-w-md font-body text-sm leading-relaxed text-ink-charcoal-soft">
            Read what past guests have said, straight from our Google
            Business Profile — or leave one yourself if you&apos;ve
            traveled with us.
          </p>
          <a
            href={siteInfo.social.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-ink-teal px-5 py-2.5 font-body text-sm font-medium text-soft-white transition hover:bg-ink-teal-deep"
          >
            Read &amp; write reviews on Google
          </a>
        </div>
      )}
    </div>
  );
}