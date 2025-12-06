
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
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
        protocol: 'https,'
        hostname: '5lgivccarqkvddiv.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  reactStrictMode: false,
  experimental: {
    allowedDevOrigins: [
      "https://6000-firebase-shopifydevguide-1764137754571.cluster-ikxjzjhlifcwuroomfkjrx437g.cloudworkstations.dev"
    ]
  }
};

export default nextConfig;
