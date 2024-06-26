/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enable strict mode
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3000/api/:path*', // Proxy to Backend
        },
      ];
    },
} 
  module.exports = nextConfig;
  
  
  
  