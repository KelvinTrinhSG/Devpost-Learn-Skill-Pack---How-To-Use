import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain static files in out/ — no server needed (spec.md > Stack).
  output: "export",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
