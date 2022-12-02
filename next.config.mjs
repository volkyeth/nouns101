/**
 * @type {import("next").NextConfig}
 **/
export default {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md"],
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          /** @type {import("@mdx-js/loader").Options} */
          options: {}
        }
      ]
    });

    return config;
  }
};
