import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `
      @use 'sass:math';
      @use './assets/scss/settings' as *;
      @use './assets/scss/responsive' as *;
      @use './assets/scss/x-browser' as *;
      @use './assets/scss/utilities' as *;
    `
  },
  env: {
    /** Default prefix used for localStorage keys */
    NEXT_PUBLIC_LS_PREFIX: 'next-starter__'
  }
};

export default nextConfig;
