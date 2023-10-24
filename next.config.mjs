/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['www.opendota.com'],
  },
};

export default nextConfig;
