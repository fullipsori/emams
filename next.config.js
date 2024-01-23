/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({ hammerjs: "commonjs hammerjs" });
    }

    return config;
  },
};
