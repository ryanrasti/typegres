/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Handle Monaco Editor
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    // Handle PGLite
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      asyncWebAssembly: true,
    };

    return config;
  },
};

export default nextConfig;
