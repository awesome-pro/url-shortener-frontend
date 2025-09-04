import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  images: {
    domains: [
      'images.unsplash.com',
      'avatars.githubusercontent.com',
      'media.istockphoto.com',
      'img.freepik.com',
      'images.pexels.com',
      'harleytherapy.co.uk',
    ],
  },
  // async redirects() {
  //   return [
  //     // Redirect root dashboard to /dashboard for authenticated users
  //     // This would need middleware to check auth status
  //   ]
  // },
  // async rewrites() {
  //   return [
  //     // Any additional rewrites if needed
  //   ]
  // }
};

export default nextConfig;