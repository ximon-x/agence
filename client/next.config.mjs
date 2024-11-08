import { webpackFallback } from "@txnlab/use-wallet-react";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        ...webpackFallback,
        fs: false,
      };
    }

    config.externals.push("pino-pretty");
    return config;
  },
};
export default nextConfig;
