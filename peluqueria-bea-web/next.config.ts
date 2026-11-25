import type { NextConfig } from "next";

/** STATIC_PREVIEW=1 genera una copia estática (carpeta out/) con rutas relativas para previsualizarla. */
const preview = process.env.STATIC_PREVIEW === "1";

const nextConfig: NextConfig = {
  cacheComponents: !preview,
  partialPrefetching: !preview,
  ...(preview ? { output: "export", assetPrefix: ".", images: { unoptimized: true } } : {}),
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
