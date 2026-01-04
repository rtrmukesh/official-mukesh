/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.gutenberg.org"], // ✅ allow Gutenberg images
  },
};

module.exports = nextConfig;
