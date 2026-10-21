/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve resized AVIF/WebP instead of the original JPEG
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Only bundle the framer-motion / lucide-react pieces that are actually used
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
