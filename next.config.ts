
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove or comment out: output: 'export'
  // API routes require server-side rendering
  
  images: {
    domains: ['res.cloudinary.com'], // For Cloudinary images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  
  // Enable API routes (default, but explicit)
  // output: 'standalone', // Use this for server deployment, not 'export'
};

module.exports = nextConfig;