const BADGES = [
  {
    title: "100% Safe & Secure",
    body: "Insured vehicles and SLTDA-registered chauffeurs on every trip.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3.5 5 6v6c0 4.5 3 7.7 7 8.5 4-.8 7-4 7-8.5V6l-7-2.5Z" />
        <path d="m9.5 12 1.8 1.8L15 10" />
      </svg>
    ),
  },
  {
    title: "5,000+ Happy Travelers",
    body: "Decades on the road, serving thousands of trips across Sri Lanka.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 14a3.2 3.2 0 1 0 0-6.4A3.2 3.2 0 0 0 8 14Z" />
        <path d="M2.5 19c.6-2.8 2.8-4.5 5.5-4.5s4.9 1.7 5.5 4.5" />
        <path d="M15.5 8.2a2.8 2.8 0 1 1 2.9 4.7" />
        <path d="M15 14.7c2.3.2 4 1.8 4.5 4.3" />
      </svg>
    ),
  },
  {
    title: "Local Expertise",
    body: "Native guides with deep cultural knowledge and decades of experience.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20.5s-7-4.9-7-10.3A7 7 0 0 1 12 3.2a7 7 0 0 1 7 7c0 5.4-7 10.3-7 10.3Z" />
        <circle cx="12" cy="10" r="2.4" />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    body: "Reachable any time on WhatsApp, throughout your journey.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12a8 8 0 0 1 16 0" />
        <rect x="3" y="12" width="4" height="6" rx="1.5" />
        <rect x="17" y="12" width="4" height="6" rx="1.5" />
        <path d="M19 18v1a3 3 0 0 1-3 3h-3" />
      </svg>
    ),
  },
  {
    title: "Best Price Guarantee",
    body: "Fixed price, agreed upfront — no hidden fees or surprises.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5v9M14.8 9.8c0-1.1-1.3-2-2.8-2s-2.6.7-2.6 1.8c0 2.6 5.4 1.2 5.4 3.8 0 1.1-1.2 1.9-2.8 1.9s-2.8-.8-2.8-1.9" />
      </svg>
    ),
  },
  {
    title: "Flexible Cancellation",
    body: "Easy, hassle-free cancellation whenever your plans change.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="4.5" width="17" height="16" rx="2.5" />
        <path d="M3.5 9.5h17" />
        <path d="m9 14.5 2 2 4-4" />
      </svg>
    ),
  },
];

/**
 * Only real, confirmed facts appear here -- no invented award, no
 * unverified certification. "SLTDA Registered" and the insurance claim
 * were confirmed directly by the business owner before this was
 * written; if either ever changes, update or remove the relevant
 * badge/copy rather than leaving a stale claim live.
 */
export default function TrustBadges() {
  return (
    <section className="border-t hairline bg-soft-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-3 text-center">YOUR TRUSTED TRAVEL PARTNER</p>
        <h2 className="text-center font-display text-3xl text-ink-teal sm:text-4xl">
          Built on decades on the road
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center font-body text-ink-charcoal-soft">
          Real credentials, not just claims — here&apos;s what backs up
          every trip we run.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BADGES.map((b) => (
            <div
              key={b.title}
              className="card-pop flex items-start gap-4 bg-warm-stone p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-teal/10 text-ink-teal">
                {b.icon}
              </span>
              <div>
                <p className="font-display text-base text-ink-teal">
                  {b.title}
                </p>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-ink-charcoal-soft">
                  {b.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {["TripAdvisor", "Google Reviews", "SLTDA Registered"].map((label) => (
            <span
              key={label}
              className="flex items-center gap-2 font-body text-sm text-ink-charcoal-soft"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-vantage-gold" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="m8.5 12.2 2.4 2.4 4.6-4.8" />
              </svg>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}