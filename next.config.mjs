/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
    unoptimized: true,
  },
  experimental: {
    forceSwcTransforms: true,
  },
}

export default nextConfig
