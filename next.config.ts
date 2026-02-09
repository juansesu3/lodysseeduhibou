import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "my-page-negiupp.s3.amazonaws.com",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
