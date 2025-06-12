import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // no swcMinify here since it's automatic or deprecated
};

export default nextConfig;
 module.exports = {
  images: {
    domains: ['example.com'],
  },
};