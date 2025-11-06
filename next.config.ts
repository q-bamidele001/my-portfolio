import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ React strict mode still works
  reactStrictMode: true,

  // ✅ Ignore ESLint errors during build
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },

  // // ✅ Ignore TypeScript errors during build
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};

export default nextConfig;
