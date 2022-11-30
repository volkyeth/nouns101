import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NutshellDefinitions } from "../components/Nouns101MdxProvider";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
// @ts-ignore
import wikiLinkPlugin from "remark-wiki-link";
import { basename } from "path";
import { readFileSync } from "fs";

export const serializeMdx = async (
  content: string,
  permalinks: string[]
): Promise<MDXRemoteSerializeResult> =>
  await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        [
          wikiLinkPlugin,
          {
            wikiLinkClassName: "wikilink",
            newClassName: "inexistent",
            hrefTemplate: (permalink: string) => permalink,
            pageResolver,
            permalinks,
          },
        ],
      ],
      rehypePlugins: [],
    },
    parseFrontmatter: true,
  });

const pageResolver = (name: string) => {
  const normalizedName = name.replace(/[ -]/g, "_").toLowerCase();
  const depluralizedName = normalizedName.replace(/[sS]$/g, "");

  return [normalizedName, depluralizedName];
};

export const serializeNutshells = async (
  nutshellFiles: string[],
  permalinks: string[]
): Promise<NutshellDefinitions> => {
  const nutshellDefinitions = {} as NutshellDefinitions;

  for (const nutshellFile of nutshellFiles) {
    const nutshellContent = readFileSync(nutshellFile).toString();

    nutshellDefinitions[basename(nutshellFile, ".mdx")] = await serializeMdx(
      nutshellContent,
      permalinks
    );
  }
  return nutshellDefinitions;
};
