import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_VERCEL_DEMO: process.env.VERCEL ? '1' : '' },
  webpack(config, { webpack }) {
    if (process.env.VERCEL) config.plugins.push(new webpack.NormalModuleReplacementPlugin(
      /^cloudflare:workers$/,
      require.resolve('./lib/vercel-cloudflare.cjs'),
    ));
    return config;
  },
};

export default nextConfig;
