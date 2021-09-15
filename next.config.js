/** @type {import('next').NextConfig} */
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  pwa: {
    dest: "public",
    runtimeCaching,
    reloadOnOnline: false,
    disable: process.env.NODE_ENV === "development",
  },
});
