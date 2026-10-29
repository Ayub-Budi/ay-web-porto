import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The about page now lives inside the home page; keep old links working.
  async redirects() {
    return [
      {
        source: "/:lang(en|id)/about",
        destination: "/:lang#about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
