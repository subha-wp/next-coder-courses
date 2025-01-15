import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gist.github.com",
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
    ],
  },
};

export default nextConfig;
