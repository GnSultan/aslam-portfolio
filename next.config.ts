import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.lummi.ai',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ampovegjevdjlsjgkxgn.supabase.co',
        port: '',
        pathname: '/**',
      },
      // Add any other Supabase projects dynamically
      ...(process.env.NEXT_PUBLIC_SUPABASE_URL ? [{
        protocol: 'https' as const,
        hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
        port: '',
        pathname: '/**',
      }] : []),
    ],
  },
};

export default nextConfig;
