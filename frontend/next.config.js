const path = require('path');

// FastAPI backend on Render. NEXT_PUBLIC_API_URL overrides for local dev or
// a future backend move; the fallback keeps forms working even if the Vercel
// env var is missing.
const API_ORIGIN = process.env.NEXT_PUBLIC_API_URL || 'https://kpr-shrimp-backend.onrender.com';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  eslint: { ignoreDuringBuilds: true },
  async rewrites() {
    // Same-origin proxy for the enquiry API — avoids CORS entirely for the
    // public forms and survives a missing NEXT_PUBLIC_API_URL.
    return [
      {
        source: '/api/:path*',
        destination: `${API_ORIGIN}/api/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Self-hosted images are content-addressed by filename in practice —
        // cache them hard instead of revalidating on every view.
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  async redirects() {
    return [
      // Canonical host: redirect www and the Vercel preview host to the apex.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.iaquatic.com' }],
        destination: 'https://iaquatic.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'frontend-mu-nine-84.vercel.app' }],
        destination: 'https://iaquatic.com/:path*',
        permanent: true,
      },
      // Retired cooked variant (specific rules must precede the generic ones).
      { source: '/products/cooked-shrimp/iqf-cooked-hlso', destination: '/products/cooked-shrimp', permanent: true },
      { source: '/products/cooked-prawns/iqf-cooked-hlso', destination: '/products/cooked-shrimp', permanent: true },
      // Interim "prawn" slugs — the site standardised on "shrimp" vocabulary.
      { source: '/products/frozen-raw-prawns', destination: '/products/frozen-raw-shrimp', permanent: true },
      { source: '/products/frozen-raw-prawns/:variant', destination: '/products/frozen-raw-shrimp/:variant', permanent: true },
      { source: '/products/cooked-prawns', destination: '/products/cooked-shrimp', permanent: true },
      { source: '/products/cooked-prawns/:variant', destination: '/products/cooked-shrimp/:variant', permanent: true },
      // Retired added-value variants, replaced by the real catalogue.
      { source: '/products/ready-to-cook/tempura-battered', destination: '/products/ready-to-cook/tempura', permanent: true },
      { source: '/products/ready-to-cook/butterfly', destination: '/products/ready-to-cook/breaded-butterfly', permanent: true },
      { source: '/products/ready-to-cook/breaded', destination: '/products/ready-to-cook/breaded-torpedo', permanent: true },
      { source: '/products/ready-to-cook/marinated', destination: '/products/ready-to-cook', permanent: true },
      { source: '/products/ready-to-cook/shrimp-skewers', destination: '/products/ready-to-cook', permanent: true },
      { source: '/products/ready-to-cook/prawn-skewers', destination: '/products/ready-to-cook', permanent: true },
      // Pages retired at the Sep 2026 meeting — all enquiries route via contact.
      { source: '/request-a-sample', destination: '/contact', permanent: true },
      { source: '/resources', destination: '/contact', permanent: true },
    ];
  },
};

module.exports = nextConfig;
