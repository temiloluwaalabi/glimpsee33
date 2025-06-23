import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pino", "pino-pretty"],
  experimental: {
    authInterrupts: true,

    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
      {
        protocol: "https",
        hostname: "https://res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "jsonplaceholder.typicode.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "https://unsplash.com",
      },
    ],
  },

  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
