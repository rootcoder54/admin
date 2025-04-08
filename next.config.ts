import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "api.unsplash.com"]
  },
  async headers() {
    return [
      {
        source: "/api/ai",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // Permet toutes les origines (tu peux spécifier une origine précise pour plus de sécurité)
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
