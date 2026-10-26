/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    // "About" and "Our Journey" are one page — real HTTP 308 so search engines follow it.
    return [{ source: '/about', destination: '/journey', permanent: true }];
  },
};

export default nextConfig;
