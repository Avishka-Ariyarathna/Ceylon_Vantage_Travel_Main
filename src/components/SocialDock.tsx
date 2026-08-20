"use client";

import { siteInfo } from "@/lib/siteInfo";
import { whatsappLink } from "@/lib/whatsapp";

type DockItem = {
  label: string;
  href: string;
  color: string;
  icon: React.ReactNode;
};

const ICON_PROPS = {
  className: "h-5 w-5",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true as const,
};

const ITEMS: DockItem[] = [
  {
    label: "WhatsApp",
    href: whatsappLink("Hi! I'd like to know more about planning a trip to Sri Lanka."),
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M16.004 3C9.377 3 4 8.373 4 14.996c0 2.19.588 4.32 1.706 6.19L4 29l8.02-1.676a13.02 13.02 0 0 0 3.984.63h.005c6.627 0 12.004-5.373 12.004-11.996C28.013 8.373 22.636 3 16.004 3Zm0 21.86h-.004a9.87 9.87 0 0 1-5.03-1.377l-.36-.213-4.76.996 1.014-4.64-.235-.376a9.83 9.83 0 0 1-1.51-5.254c0-5.457 4.44-9.895 9.9-9.895 2.644 0 5.128 1.03 6.997 2.898a9.83 9.83 0 0 1 2.897 6.998c0 5.457-4.44 9.863-9.909 9.863Zm5.42-7.396c-.297-.149-1.758-.868-2.031-.967-.273-.099-.472-.149-.67.148-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.149-1.254-.462-2.39-1.475-.883-.788-1.48-1.76-1.653-2.058-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.148-.174.198-.298.297-.496.099-.198.05-.372-.025-.52-.074-.149-.67-1.614-.918-2.211-.242-.581-.487-.502-.67-.511l-.57-.01c-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479s1.065 2.874 1.213 3.072c.148.198 2.096 3.2 5.078 4.489.709.306 1.262.489 1.693.626.711.226 1.359.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.174-1.412-.074-.124-.272-.198-.57-.347Z" />
      </svg>
    ),
  },
  {
    label: "Call",
    href: `tel:${siteInfo.phoneDisplay.replace(/\s+/g, "")}`,
    color: "#d9b876",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M4 5.5c0-.8.6-1.5 1.5-1.5h2.2c.6 0 1.1.4 1.3 1l1 3c.2.6 0 1.2-.5 1.6l-1.4 1.1a13 13 0 0 0 5.7 5.7l1.1-1.4c.4-.5 1-.7 1.6-.5l3 1c.6.2 1 .7 1 1.3v2.2c0 .9-.7 1.5-1.5 1.5C10.6 20.9 3.1 13.4 3.1 5.9 3.1 5.7 4 5.5 4 5.5Z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${siteInfo.email}`,
    color: "#eef2f0",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: siteInfo.social.instagram,
    color: "#E1306C",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: siteInfo.social.facebook,
    color: "#1877F2",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M14.5 8.5h2V5.3c-.35-.05-1.53-.15-2.9-.15-2.87 0-4.84 1.75-4.84 4.97v2.6H6v3.5h3.26V21h3.6v-4.78h3.13l.5-3.5h-3.63V10.5c0-1.01.28-1.7 1.64-1.7Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TripAdvisor",
    href: siteInfo.social.tripadvisor,
    color: "#34E0A1",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="8" cy="13.5" r="4" />
        <circle cx="16" cy="13.5" r="4" />
        <circle cx="8" cy="13.5" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="16" cy="13.5" r="1.4" fill="currentColor" stroke="none" />
        <path d="M5.2 9.8C6.7 8 9 7 12 7s5.3 1 6.8 2.8" />
      </svg>
    ),
  },
];

/**
 * Floating "liquid glass" contact rail shown over the Hero wallpaper on
 * larger screens. Sits vertically along the right edge, and each pill
 * slides open to reveal its label on hover.
 *
 * The mobile equivalent is the separate MobileContactRow export below —
 * it deliberately does NOT live here as an absolutely-positioned overlay,
 * because a fixed pixel offset can't reliably clear the hero's heading/
 * button/checklist stack across every phone width and every line-wrap
 * (that was the cause of the icons overlapping the CTA button). Instead
 * MobileContactRow is placed directly in the normal content flow in
 * Hero.tsx, right after the checklist, so it simply pushes below
 * whatever comes before it and can never overlap anything.
 */
export default function SocialDock() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-4 z-20 hidden items-center sm:right-6 md:flex"
      aria-label="Quick contact links"
    >
      <div className="pointer-events-auto flex w-40 flex-col items-end gap-3">
        {ITEMS.map((item, i) => (
          <DockPill key={item.label} item={item} delay={i * 90} />
        ))}
      </div>
    </div>
  );
}

/**
 * Compact horizontal glass row of the same contact links, for phones.
 * Rendered in-flow (not absolutely positioned) so it can't drift over
 * other hero content -- see the note above.
 */
export function MobileContactRow() {
  return (
    <div className="liquid-glass mt-6 flex w-fit items-center gap-1 rounded-full p-1.5 md:hidden">
      {ITEMS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className="flex h-9 w-9 items-center justify-center rounded-full text-soft-white transition active:scale-90"
          style={{ color: item.color }}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}

function DockPill({ item, delay }: { item: DockItem; delay: number }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="liquid-glass animate-fade-in-up group/pill flex h-12 w-12 items-center justify-center overflow-hidden rounded-full text-soft-white transition-[width] duration-300 ease-out hover:w-40 focus-visible:w-40"
      style={{ animationDelay: `${400 + delay}ms`, animationFillMode: "both" }}
    >
      <span className="flex w-12 shrink-0 items-center justify-center" style={{ color: item.color }}>
        {item.icon}
      </span>
      <span className="w-0 overflow-hidden whitespace-nowrap font-body text-sm text-soft-white opacity-0 transition-all duration-300 ease-out group-hover/pill:w-28 group-hover/pill:opacity-100 group-focus-visible/pill:w-28 group-focus-visible/pill:opacity-100">
        {item.label}
      </span>
    </a>
  );
}