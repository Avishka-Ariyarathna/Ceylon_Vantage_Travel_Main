import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TripAdvisorWidget from "@/components/TripAdvisorWidget";
import FacebookPagePlugin from "@/components/FacebookPagePlugin";
import InstagramFollowCard from "@/components/InstagramFollowCard";
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel";
import { TripAdvisorMark } from "@/components/BrandLogos";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Reviews — Ceylon Vantage",
  description:
    "Verified guest reviews for Ceylon Vantage, pulled live from TripAdvisor and Google.",
};

/**
 * Google: GoogleReviewsCarousel fetches live review text from our own
 * /api/google-reviews route once GOOGLE_PLACES_API_KEY and
 * GOOGLE_PLACE_ID are set (see .env.example) -- falls back to a plain
 * link-out card until then, so nothing looks broken in the meantime.
 * Given the full-width showcase treatment here since it's the richest
 * content (actual review text) -- TripAdvisor and social links are
 * secondary supporting cards below it.
 *
 * TripAdvisor: the free, official self-serve widget (TripAdvisorWidget)
 * shows a live rating/link, but not review text. TripAdvisor does now
 * offer review text (up to ~5 reviews + photos per location) through
 * their Content API self-serve tier at tripadvisor.com/business/insights/content-api
 * -- but as of checking, that tier is paid ("pay monthly, cancel
 * anytime"), unlike Google's free-tier Places API used above. Worth
 * doing if you want full parity with the Google showcase; wire it in
 * the same way as GoogleReviewsCarousel once you have a key.
 */
export default function ReviewsPage() {
  return (
    <main>
      <NavBar />

      <section className="bg-ink-teal px-6 pb-16 pt-40 text-soft-white">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow mb-3">WHAT GUESTS SAY</p>
          <h1 className="font-display text-4xl sm:text-5xl">
            Reviews &amp; feedback
          </h1>
          <p className="mt-4 max-w-xl font-body text-soft-white/80">
            Verified feedback from travelers we&apos;ve driven around the
            island, shown here exactly as it appears on our public
            listings — nothing edited, nothing hand-picked.
          </p>
        </div>
      </section>

      {/* Google Reviews -- full-width showcase, wider container than the
          rest of the page so a multi-column grid of reviews has room to
          breathe rather than being squeezed into a half-width card. */}
      <section className="bg-soft-white px-6 pb-4 pt-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GoogleReviewsCarousel />
          </Reveal>
        </div>
      </section>

      <section className="bg-soft-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <Reveal delayMs={100}>
            <div className="mx-auto rounded-2xl border hairline bg-ink-teal px-6 py-8 text-center text-soft-white sm:px-10">
              <p className="font-display text-xl">
                Want to hear from a recent traveler directly?
              </p>
              <p className="mx-auto mt-2 max-w-md font-body text-sm text-soft-white/75">
                Message us and we&apos;ll happily connect you with
                references from a trip similar to the one you&apos;re
                planning.
              </p>
              <a
                href={whatsappLink(
                  "Hi! Could you share some references or past guest feedback?"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-full bg-vantage-gold px-6 py-2.5 font-body text-sm font-medium text-ink-teal-deep transition hover:bg-vantage-gold-soft"
              >
                Ask us on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delayMs={200}>
            <div className="mt-16">
              <p className="eyebrow mb-3 text-center">MORE PLACES TO FIND US</p>
              <h2 className="text-center font-display text-2xl text-ink-teal sm:text-3xl">
                Ratings, updates, and behind-the-scenes
              </h2>
              <p className="mx-auto mt-3 max-w-md text-center font-body text-sm text-ink-charcoal-soft">
                Every channel we&apos;re actually active on, live and
                straight from the source.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="card-pop flex h-full flex-col bg-warm-stone p-8">
                  <div className="flex items-center gap-3">
                    <TripAdvisorMark className="h-9 w-9" />
                    <div>
                      <p className="font-display text-lg text-ink-teal">
                        TripAdvisor
                      </p>
                      <p className="font-body text-xs uppercase tracking-wide text-ink-charcoal-soft/60">
                        Live rating
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 font-body text-sm leading-relaxed text-ink-charcoal-soft">
                    Pulled directly from our TripAdvisor listing — this
                    updates automatically as new reviews come in.
                  </p>
                  <div className="mt-5">
                    <TripAdvisorWidget />
                  </div>
                </div>

                <FacebookPagePlugin />
                <InstagramFollowCard />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}