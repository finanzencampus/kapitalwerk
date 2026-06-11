import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Für GitHub Pages: /kapitalwerk (Repo-Name). Bei Custom Domain auf "" setzen.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
