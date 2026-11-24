import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (smallest), WebP fallback.
    formats: ["image/avif", "image/webp"],
    // 50 is used for heavily overlaid background images; 75 is the default.
    qualities: [50, 75],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "randomuser.me" },
    ],
    minimumCacheTTL: 2678400, // 31 days
  },
  experimental: {
    // Only ship the icons/components actually used from these large packages.
    optimizePackageImports: ["lucide-react", "react-icons", "framer-motion"],
  },
  async headers() {
    return [
      {
        source: "/:file(.*\\.(?:jpg|jpeg|png|webp|avif|svg|ico))",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
