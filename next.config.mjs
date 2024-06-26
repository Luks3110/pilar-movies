/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"],
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
