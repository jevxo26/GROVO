import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // এটি সব ডোমেইনের ইমেজ এলাও করার কথা
      },
    ],
  },
};

export default nextConfig;