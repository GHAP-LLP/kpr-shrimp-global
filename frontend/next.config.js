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
  async redirects() {
    // Legacy "shrimp" slugs — the site standardised on "prawn" vocabulary.
    return [
      { source: '/products/frozen-raw-shrimp', destination: '/products/frozen-raw-prawns', permanent: true },
      { source: '/products/frozen-raw-shrimp/:variant', destination: '/products/frozen-raw-prawns/:variant', permanent: true },
      { source: '/products/cooked-shrimp', destination: '/products/cooked-prawns', permanent: true },
      { source: '/products/cooked-shrimp/:variant', destination: '/products/cooked-prawns/:variant', permanent: true },
      { source: '/products/ready-to-cook/shrimp-skewers', destination: '/products/ready-to-cook/prawn-skewers', permanent: true },
    ];
  },
};

module.exports = nextConfig;
