import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["placehold.co"], // ✅ allow external images from placehold.co
  },
};

export default nextConfig;
