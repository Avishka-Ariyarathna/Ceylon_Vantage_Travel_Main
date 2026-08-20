import RidgeLine from "./RidgeLine";
import ImageSlideshow from "./ImageSlideshow";
import SocialDock, { MobileContactRow } from "./SocialDock";

const HERO_IMAGES = [
  "/images/hero/hero.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-ink-teal-deep px-6 pb-16 pt-40"
    >
      {/* Background slideshow — drop files at /public/images/hero/hero.jpg,
          hero-2.jpg, hero-3.jpg and they'll rotate automatically */}
      <ImageSlideshow
        images={HERO_IMAGES}
        alt="Sri Lanka landscape"
        mode="auto"
        intervalMs={6000}
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full"
      />

      <SocialDock />

      {/* Layered ridge silhouettes — the elevation-profile signature, stacked for depth */}
      <div className="pointer-events-none absolute inset-0">
        {/* Light overall tint so the photo stays visible, with a stronger
            fade only where the text sits, at the bottom */}
        <div className="absolute inset-0 bg-ink-teal-deep/20" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-b from-transparent to-ink-teal-deep" />
        <RidgeLine
          tone="stone"
          className="absolute bottom-0 left-0 h-40 w-[140%] opacity-[0.08]"
        />
        <RidgeLine
          tone="stone"
          className="absolute bottom-6 left-[-10%] h-56 w-[140%] opacity-[0.14]"
        />
        <RidgeLine
          tone="gold"
          className="absolute bottom-0 left-[-5%] h-24 w-[130%] opacity-[0.5]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <p className="eyebrow mb-6">6°55&apos;N 79°50&apos;E — COLOMBO, SRI LANKA</p>
        <h1 className="font-display max-w-3xl text-[2.75rem] leading-[1.05] text-soft-white sm:text-6xl lg:text-7xl">
          See Sri Lanka from where we stand.
        </h1>
        <p className="mt-6 max-w-xl font-body text-lg text-soft-white/80">
          Decades behind the wheel taught us every back road, hidden viewpoint,
          and quiet detour the island has to offer. We design your trip from
          that same vantage point — not the version everyone else sees.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="rounded-full bg-vantage-gold px-7 py-3 font-body text-sm font-medium text-ink-teal-deep transition hover:bg-vantage-gold-soft"
          >
            Start planning your trip
          </a>
          <a
            href="#about"
            className="font-body text-sm text-soft-white/85 underline decoration-vantage-gold/50 underline-offset-4 transition hover:text-vantage-gold-soft"
          >
            How it works
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {[
            "Private chauffeur-guide",
            "Fixed price, agreed upfront",
            "English-speaking driver",
            "Reachable on WhatsApp, any time",
          ].map((point) => (
            <li
              key={point}
              className="flex items-center gap-2 font-body text-xs text-soft-white/70 sm:text-sm"
            >
              <span aria-hidden="true" className="text-vantage-gold">
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>

        <MobileContactRow />
      </div>
    </section>
  );
}