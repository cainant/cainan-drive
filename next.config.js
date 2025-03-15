import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    reactCompiler: true,
  },
};

export default config;
