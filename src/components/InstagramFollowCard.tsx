import { siteInfo } from "@/lib/siteInfo";

/**
 * Instagram has no free, official embed for a live scrolling feed the
 * way Facebook does -- that requires either a paid third-party widget
 * (SnapWidget, Elfsight, LightWidget all have a free tier worth
 * checking if you want an actual live grid here later) or a Meta
 * Developer app with API review. Rather than fake a feed, this is an
 * honest, well-designed "follow us" card that links straight to the
 * real profile.
 *
 * SWAP-IN INSTRUCTIONS if you later sign up for a widget service: drop
 * their embed <iframe>/<script> in here in place of the card body --
 * the rest of the page (grid layout, spacing) won't need to change.
 */
export default function InstagramFollowCard() {
  return (
    <a
      href={siteInfo.social.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border hairline bg-warm-stone p-8 text-center transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span
        className="flex h-16 w-16 items-center justify-center rounded-2xl text-white transition group-hover:scale-105"
        style={{
          background:
            "radial-gradient(circle at 30% 110%, #ffdb8b 0%, #ee2a7b 45%, #6228d7 100%)",
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <p className="mt-5 font-display text-lg text-ink-teal">
        Follow us on Instagram
      </p>
      <p className="mt-2 max-w-xs font-body text-sm text-ink-charcoal-soft">
        Trip photos, routes, and behind-the-scenes from the road —{" "}
        {siteInfo.social.instagramHandle}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border hairline px-4 py-2 font-body text-sm text-ink-teal transition group-hover:border-vantage-gold/70 group-hover:text-vantage-gold">
        View profile
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </a>
  );
}