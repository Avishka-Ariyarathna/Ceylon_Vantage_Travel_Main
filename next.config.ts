import type { NextConfig } from "next";

// Security headers applied to every response. Keeps the site hardened
// against common client-side attacks (clickjacking, MIME sniffing,
// referrer leakage) without touching how any page is built.
//
// One nuance: Next.js's DEV-mode tooling (Fast Refresh / error overlay)
// needs eval() to work in the browser, but the production build never
// uses eval() at all. So 'unsafe-eval' is only added to the script-src
// rule when running `next dev` -- the deployed/production CSP stays
// fully locked down.
const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  // Prevents the site from being embedded in an <iframe> on another
  // domain -- the standard defense against clickjacking.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stops browsers from guessing content types and executing files as
  // something other than what they were served as.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Only send the origin (not the full URL/path) as a referrer when
  // navigating to a different site -- avoids leaking internal paths.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disables browser features this site never uses, so an embedded/
  // compromised script can't invoke the camera, mic, or location.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Forces HTTPS for a year (including subdomains) once a browser has
  // seen it once, and opts into browser HSTS preload lists.
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Content-Security-Policy: allows this site's own assets, the Google
  // Fonts stylesheet/font files, the Google Maps embed (contact page),
  // TripAdvisor's widget script + image (reviews page), and Facebook's
  // JS SDK + Page Plugin (reviews page -- connect.facebook.net serves
  // the SDK script itself, and the actual embedded plugin frame gets
  // rendered from web.facebook.com or staticxx.facebook.com depending
  // on how Facebook routes the request). 'unsafe-inline' on styles is
  // required by Tailwind's runtime and Next's inline critical CSS;
  // scripts stay locked down to self + the named third parties (plus
  // 'unsafe-eval' in dev only, see note above).
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'self'",
      "img-src 'self' data: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.jscache.com https://connect.facebook.net`,
      "connect-src 'self' https://www.jscache.com https://graph.facebook.com",
      "frame-src 'self' https://www.google.com https://www.facebook.com https://web.facebook.com https://staticxx.facebook.com",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;