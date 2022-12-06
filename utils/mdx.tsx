import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NutshellDefinitions } from "../components/Nouns101MdxProvider";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkEmbedder, { Transformer } from "@remark-embedder/core";
import transformerOembed, { Config } from "@remark-embedder/transformer-oembed";
// @ts-ignore
import wikiLinkPlugin from "remark-wiki-link";
import { basename } from "path";
import { readFileSync } from "fs";

export const serializeMdx = async (
  content: string
): Promise<MDXRemoteSerializeResult> =>
  await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        [
          wikiLinkPlugin,
          {
            wikiLinkClassName: "wikilink",
            hrefTemplate: (permalink: string) => normalizeName(permalink),
          },
        ],
        [
          remarkEmbedder,
          {
            transformers: [
              [
                transformerOembed,
                {
                  params: {
                    omit_script: false,
                    aspectRatio: "16 / 9",
                    width: "100%",
                    align: "center",
                    maxwidth: 550,
                    maxheight: 310,
                    // maxheight: 600,
                  },
                } as Config,
              ],
            ],
          },
        ],
      ],
      rehypePlugins: [],
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
