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
  },
  images: {
    domains: ["assets.tina.io"]
  },
  redirects: async () => {
    return [
    {
      source: '/',
      has: [
        {
          type: 'host',
          value: 'bitnouns.wtf',
        },
      ],
      permanent: false,
      destination: 'https://www.nouns101.wtf/glossary/bitNouns',
    },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'www.bitnouns.wtf',
          },
        ],
        permanent: false,
        destination: 'https://www.nouns101.wtf/glossary/bitNouns',
      },
  ]}
};
