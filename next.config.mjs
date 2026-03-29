import path from 'path';
import { fileURLToPath } from 'url';

const workspaceRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  experimental: {
    workerThreads: true,
  },
  turbopack: {
    root: workspaceRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Ensure proper trailing slash handling for Vercel
  trailingSlash: false,
  // Enable standalone output for Vercel
  output: 'standalone',
};

export default nextConfig;
