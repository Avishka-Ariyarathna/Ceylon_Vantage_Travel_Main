import Link from "next/link";
import { whatsappLink } from "@/lib/whatsapp";
import ServiceCardImage from "./ServiceCardImage";

const SERVICES = [
  {
    // Add your own photo at this exact path (public/images/services/) —
    // see public/images/services/README.md for filenames and sizing.
    image: "/images/services/airport-transfers.jpg",
    title: "Airport Transfers",
    description:
      "We track your flight, meet you at arrivals with a name board, and take you straight to your hotel — a fixed price agreed in advance, no waiting, no haggling.",
    ctaLabel: "Book airport pickup",
    ctaHref: whatsappLink("Hi! I'd like to book an airport transfer."),
    external: true,
  },
  {
    image: "/images/services/private-day-tours.jpg",
    title: "Private Day Tours & Excursions",
    description:
      "Sigiriya, Kandy, Ella, the south coast — explored at your own pace with a private driver-guide who adapts the day to you. No group schedules, no rushed stops.",
    ctaLabel: "Browse day tours",
    ctaHref: "/tours",
    external: false,
  },
  {
    image: "/images/services/custom-tour-packages.jpg",
    title: "Custom Sri Lanka Tour Packages",
    description:
      "Tell us what you want to see and we'll design a tailor-made circuit across the Cultural Triangle, hill country, and southern beaches — route, stops, and logistics all handled.",
    ctaLabel: "Start planning",
    ctaHref: "/contact",
    external: false,
  },
  {
    image: "/images/services/car-van-hire.jpg",
    title: "Private Car & Van Hire with Driver",
    description:
      "Hire a private vehicle with an experienced driver for as long as you need — a few hours, a full day, or your entire trip. Ideal for families and small groups.",
    ctaLabel: "Get a quote",
    ctaHref: whatsappLink("Hi! I'd like a quote for a private car/van with driver."),
    external: true,
  },
];

const MORE_CAPABILITIES = [
  {
    title: "Expert Tour Guides",
    body: "Deep, native knowledge of Sri Lankan culture, history, and hidden gems.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19c.6-3 3-5 5.5-5s4.9 2 5.5 5" />
        <circle cx="17.5" cy="8.5" r="2.2" />
        <path d="M15.5 13.3c1.9.4 3.3 2 3.8 4.2" />
      </svg>
    ),
  },
  {
    title: "Destination Selection",
    body: "Honest advice on where to go based on season, interests, and time.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="m15.2 8.8-2 4.4-4.4 2 2-4.4 4.4-2Z" />
      </svg>
    ),
  },
  {
    title: "Accommodation Booking",
    body: "From luxury resorts to boutique stays, matched to your budget.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 20V7a1 1 0 0 1 1-1H12a1 1 0 0 1 1 1v13" />
        <path d="M13 11h6.5a1 1 0 0 1 1 1v8" />
        <path d="M3.5 20h17" />
        <path d="M6.5 9.5h2M6.5 13h2M6.5 16.5h2" />
      </svg>
    ),
  },
  {
    title: "Photography Tours",
    body: "Guided visits timed for the light, at the island's most photogenic spots.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-2h7l1 2h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-9Z" />
        <circle cx="12" cy="12.5" r="3.3" />
      </svg>
    ),
  },
  {
    title: "Travel Insurance",
    body: "Facilitation for comprehensive coverage, so you can travel with peace of mind.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3.5 5 6v6c0 4.5 3 7.7 7 8.5 4-.8 7-4 7-8.5V6l-7-2.5Z" />
        <path d="m9.5 12 1.8 1.8L15 10" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className="bg-warm-stone px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-3">WHAT WE OFFER</p>
        <h2 className="font-display max-w-xl text-3xl text-ink-teal sm:text-4xl">
          Everything you need to travel Sri Lanka comfortably
        </h2>
        <p className="mt-4 max-w-xl font-body text-ink-charcoal-soft">
          From the moment you land to the moment you depart, Ceylon Vantage
          covers every journey in between.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="card-pop group flex flex-col justify-between overflow-hidden bg-soft-white p-6"
            >
              <div>
                <ServiceCardImage src={s.image} alt={s.title} />
                <p className="font-display text-lg text-ink-teal">
                  {s.title}
                </p>
                <p className="mt-2 font-body text-sm text-ink-charcoal-soft">
                  {s.description}
                </p>
              </div>

              {s.external ? (
                <a
                  href={s.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-full bg-ink-teal px-5 py-2 text-center font-body text-sm text-soft-white transition hover:bg-ink-teal-deep"
                >
                  {s.ctaLabel}
                </a>
              ) : (
                <Link
                  href={s.ctaHref}
                  className="mt-5 inline-block rounded-full bg-ink-teal px-5 py-2 text-center font-body text-sm text-soft-white transition hover:bg-ink-teal-deep"
                >
                  {s.ctaLabel}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Additional capabilities that don't need their own photo card --
            confirmed real services (accommodation, photography tours, and
            travel insurance facilitation were confirmed by the business
            owner directly before this was written). */}
        <p className="mt-16 font-body text-sm font-medium uppercase tracking-wide text-ink-charcoal-soft/60">
          ...and everything else covered too
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MORE_CAPABILITIES.map((c) => (
            <div
              key={c.title}
              className="flex items-start gap-3 rounded-xl border hairline bg-soft-white/60 p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-teal/10 text-ink-teal">
                {c.icon}
              </span>
              <div>
                <p className="font-display text-base text-ink-teal">
                  {c.title}
                </p>
                <p className="mt-1 font-body text-sm text-ink-charcoal-soft">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}