import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // ⚠️ Esto permite el deployment incluso con errores de TypeScript
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⚠️ Esto ignora errores de ESLint durante el build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;