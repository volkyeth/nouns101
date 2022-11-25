// @ts-check
import wikiLinkPlugin from "remark-wiki-link";
import remarkGfm from "remark-gfm";
import imageSize from "rehype-img-size";
import mdx from "@next/mdx";
import fs from "fs";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkGfm,
      [
        wikiLinkPlugin,
        {
          wikiLinkClassName: "wikilink",
          newClassName: "inexistent",
          hrefTemplate: (permalink) => permalink,
          pageResolver: (name) => [name.replace(/[ -]/g, '_').replace(/[sS]$/g, '').toLowerCase()],
          permalinks: fs
            .readdirSync("./content/glossary")
            .map((filename) => filename.split(".")[0]),
        },
      ],
    ],
    rehypePlugins: [imageSize],
    providerImportSource: "@mdx-js/react",
  },
});

/**
 * @type {import('next').NextConfig}
 **/
export default withMDX({
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});
