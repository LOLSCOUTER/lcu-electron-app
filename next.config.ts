import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true, // ← 이 줄이 핵심입니다.
  },
};

export default nextConfig;
