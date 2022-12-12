import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NutshellDefinitions } from "../components/Nouns101MdxProvider";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
// @ts-ignore
import wikiLinkPlugin from "remark-wiki-link";
import rehypeRewrite, { RehypeRewriteOptions } from "rehype-rewrite";
import { basename } from "path";
import { readFileSync } from "fs";
import { fetchTweetAst } from "static-tweets";
import remarkEmbedder, {
  RemarkEmbedderOptions,
  Transformer,
} from "@remark-embedder/core";

export const serializeMdx = async (
  content: string
): Promise<MDXRemoteSerializeResult> =>
  await serialize(content, {
    scope: { tweetAsts: await fetchTweetAsts(content) },
    mdxOptions: {
      development: true,
      remarkPlugins: [
        remarkGfm,
        [
          wikiLinkPlugin,
          {
            wikiLinkClassName: "wikilink",
            hrefTemplate: (permalink: string) => normalizeName(permalink),
          },
        ],
        // [
        //   remarkEmbedder,
        //   {
        //     transformers: [],
        //   } as RemarkEmbedderOptions,
        // ],
      ],
      rehypePlugins: [
        [
          rehypeRewrite,
          {
            rewrite: async (node, index, parent) => {
              // if (node?.type === "element" && node?.tagName === "a") {
              //   node.children[0]!.value = "test";
              // }
              await embedTweets(node, index, parent);
              // @ts-ignore
            },
          } as RehypeRewriteOptions,
        ],
      ],
    },
    parseFrontmatter: true,
  });

export type SerializeNutshellsResult = {
  definitions: NutshellDefinitions;
  terms: { [permalink: string]: string };
};

export const serializeNutshells = async (
  nutshellFiles: string[]
): Promise<SerializeNutshellsResult> => {
  const definitions = {} as NutshellDefinitions;
  const terms = {} as { [permalink: string]: string };

  for (const nutshellFile of nutshellFiles) {
    const nutshellContent = readFileSync(nutshellFile).toString();
    const serializedNutshell = await serializeMdx(nutshellContent);
    const permalink = normalizeName(basename(nutshellFile, ".mdx"));

    definitions[permalink] = serializedNutshell;
    terms[permalink] = serializedNutshell?.frontmatter?.title ?? permalink;
    if (serializedNutshell?.frontmatter?.aliases) {
      for (const alias of serializedNutshell.frontmatter.aliases) {
        const normalizedName = normalizeName(alias);
        const depluralizedName = depluralizeName(normalizedName);
        definitions[normalizedName] = serializedNutshell;
        definitions[depluralizedName] = serializedNutshell;
      }
    }
  }

  return { definitions, terms };
};

export const normalizeName = (name: string) =>
  name.replace(/[ -]/g, "_").toLowerCase();

export const depluralizeName = (name: string) => name.replace(/[sS]$/g, "");

const matchTweetId = /(?<=twitter\.com\/.+\/status\/)\d+/g;

const embedTweets: RehypeRewriteOptions["rewrite"] = async (
  node,
  index,
  parent
) => {
  if (
    node.type == "element" &&
    node.tagName == "a" &&
    node.properties?.href &&
    matchTweetId.test(node.properties.href as string)
  ) {
    // node.children[0]!.value = "test";
    const tweetId = (node.properties.href as string).match(matchTweetId)![0];
    const tweetAst = await fetchTweetAst(tweetId);

    node = {
      // @ts-ignore
      type: "mdxJsxFlowElement",
      children: [],
      position: {
        start: { line: 13, column: 1, offset: 191 },
        end: { line: 13, column: 86, offset: 276 },
      },
      name: "Tweet",
      attributes: [
        {
          type: "mdxJsxAttribute",
          name: "id",
          value: tweetId,
        },
        { type: "mdxJsxAttribute", name: "ast", value: tweetAst },
      ],
    };

    console.log(node);
    // @ts-ignore
    // node.type = "mdxJsxFlowElement";
    // // @ts-ignore
    // node.name = "Tweet";
    // node.children = [];
    // // @ts-ignore
    // node.attributes = [
    //   { type: "mdxJsxAttribute", name: "id", value: tweetId },
    //   {
    //     type: "mdxJsxAttribute",
    //     name: "ast",
    //     value: tweetAst,
    //   },
    // ];

    // @ts-ignore
    // delete node.tagName;
    // // @ts-ignore
    // delete node.properties;

    // console.log(node);
  }
};

const fetchTweetAsts = async (mdx: string) => {
  return (
    mdx.match(matchTweetId)?.reduce(
      async (tweetAsts, tweetId) => ({
        ...tweetAsts,
        [tweetId]: await fetchTweetAst(tweetId),
      }),
      {}
    ) ?? {}
  );
};
