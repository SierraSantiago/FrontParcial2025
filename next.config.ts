import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: ['images.unsplash.com', 'i.imgur.com', 'imgur.com', 'pbs.twimg.com', 'media.tenor.com', 'media.giphy.com', "i.imgflip.com" ],
  }
};

export default nextConfig;
