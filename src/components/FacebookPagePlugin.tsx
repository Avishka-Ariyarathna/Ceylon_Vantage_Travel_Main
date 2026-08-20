"use client";

import { useEffect, useRef, useState } from "react";
import { siteInfo } from "@/lib/siteInfo";

declare global {
  interface Window {
    FB?: {
      init: (opts: Record<string, unknown>) => void;
      XFBML: { parse: (node?: HTMLElement) => void };
    };
    fbAsyncInit?: () => void;
  }
}

const SDK_SRC = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0";

function loadSdk(onReady: () => void) {
  if (window.FB) {
    onReady();
    return;
  }
  const existing = document.getElementById("facebook-jssdk");
  if (existing) {
    existing.addEventListener("load", onReady, { once: true });
    return;
  }

  window.fbAsyncInit = () => {
    window.FB?.init({ xfbml: false, version: "v21.0" });
    onReady();
  };

  const script = document.createElement("script");
  script.id = "facebook-jssdk";
  script.src = SDK_SRC;
  script.async = true;
  script.defer = true;
  script.crossOrigin = "anonymous";
  document.body.appendChild(script);
}

/**
 * Facebook's official Page Plugin, loaded via their JS SDK (XFBML).
 *
 * `data-adapt-container-width="true"` is Facebook's own documented flag
 * for making this responsive, but it's widely reported (and confirmed
 * here) to be unreliable, especially inside a flex/grid layout where
 * the true available width isn't settled at the moment Facebook's
 * script measures it -- it silently falls back to a fixed ~500px,
 * which overflows a narrower card. Rather than trust that flag, this
 * measures the actual container width itself via a ref and passes that
 * exact pixel number to Facebook explicitly, then re-measures on
 * window resize so it stays correct if the layout reflows.
 *
 * Known limitation worth being upfront about: even sized correctly,
 * this plugin has a long, widely-reported history of being flaky for
 * reasons outside our control -- Facebook's own backend occasionally
 * rejects render requests. There's no more "official" or reliable free
 * embed than this one, so the permanent "View our Facebook page" link
 * below stays as a fallback for whenever that happens.
 */
export default function FacebookPagePlugin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);
  const sdkReady = useRef(false);

  useEffect(() => {
    const measure = () => {
      const el = containerRef.current;
      if (!el) return;
      setWidth(Math.max(280, el.clientWidth - 2));
    };

    measure();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  useEffect(() => {
    if (width === null) return;

    loadSdk(() => {
      sdkReady.current = true;
      // Re-parse this specific node (not the whole page) so a resize
      // re-render with a new width actually takes effect, rather than
      // Facebook only ever rendering the first size it saw.
      requestAnimationFrame(() => {
        if (containerRef.current) window.FB?.XFBML.parse(containerRef.current);
      });
    });
  }, [width]);

  return (
    <div className="overflow-hidden rounded-2xl border hairline bg-warm-stone p-3">
      <div ref={containerRef}>
        <div id="fb-root" />
        {width !== null && (
          <div
            key={width}
            className="fb-page"
            data-href={siteInfo.social.facebook}
            data-tabs="timeline"
            data-width={width}
            data-height="500"
            data-small-header="false"
            data-hide-cover="false"
            data-show-facepile="true"
          />
        )}
      </div>
      <a
        href={siteInfo.social.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-1.5 rounded-full border hairline py-2 font-body text-sm text-ink-teal transition hover:border-vantage-gold/70 hover:text-vantage-gold"
      >
        View our Facebook page
      </a>
    </div>
  );
}