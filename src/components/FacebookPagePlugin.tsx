import { siteInfo } from "@/lib/siteInfo";

/**
 * Branded Facebook Follow Card.
 *
 * Matches the design and dimensions of InstagramFollowCard and TripAdvisorCard
 * for a unified 3-column social proof showcase on the Reviews page.
 *
 * Avoids Facebook's JS SDK / iframe embed which causes cross-origin
 * ErrorUtils console warnings and slower page loads.
 */
export default function FacebookPagePlugin() {
  return (
    <a
      href={siteInfo.social.facebook}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border hairline bg-warm-stone p-8 text-center transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span
        className="flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-sm transition group-hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #1877F2 0%, #0c57c4 100%)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-8 w-8 fill-current"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </span>
      <p className="mt-5 font-display text-lg text-ink-teal">
        Follow us on Facebook
      </p>
      <p className="mt-2 max-w-xs font-body text-sm text-ink-charcoal-soft">
        Guest updates, island route ideas, and traveler stories from the road
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border hairline px-4 py-2 font-body text-sm text-ink-teal transition group-hover:border-vantage-gold/70 group-hover:text-vantage-gold">
        Visit page
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4 transition group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </a>
  );
}