
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // This is required to allow requests from the development environment (cloud workstation).
    allowedDevOrigins: [
      "https://*.cloudworkstations.dev",
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'khahax3ontgwrypo.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '5lgivccarqkvddiv.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
