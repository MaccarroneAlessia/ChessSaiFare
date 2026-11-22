import type { NextConfig } from 'next';

// Static export: the site is served as plain files (Cloudflare Pages).
// Revisit this when the app needs a server.
const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
