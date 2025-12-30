const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== "production",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  // 🚫 FORCE WEBPACK (critical)
  experimental: {
    turbo: false,
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
