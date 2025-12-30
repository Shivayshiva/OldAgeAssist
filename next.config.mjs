import withPWA from 'next-pwa';

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const baseConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Explicit Turbopack config (fixes the error)
  turbopack: {},

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.google.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
  },
};

export default withPWA({
  ...baseConfig,
  pwa: {
    dest: 'public',
    disable: !isProd,
    register: true,
    skipWaiting: true,
    manifest: '/manifest.json',
  },
});
