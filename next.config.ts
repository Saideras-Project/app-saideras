import type { NextConfig } from "next";
import * as pkg from "./package.json";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    version: pkg.version,
  },
  transpilePackages: [
    "@saidera/lib",
    "@saidera/ui",
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
};

export default nextConfig;
