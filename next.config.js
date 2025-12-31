// To force Webpack (not Turbopack) on Next.js 13+ and Railway, use the --webpack flag in your scripts.
// Example: "dev": "next dev --webpack", "build": "next build --webpack", "start": "next start --webpack"

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV !== "production",
  disable:false
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },



  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.google.com" },
      { protocol: "https", hostname: "ik.imagekit.io" },
    ],
  },
};

module.exports = withPWA(nextConfig);
