import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
// @ts-ignore
import wikiLinkPlugin from "remark-wiki-link";
import { basename } from "path";
import { readFileSync } from "fs";
import {
  depluralizeName,
  normalizeName,
  NutshellDefinitionsMap,
} from "../components/Nutshell";

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
      ],
      rehypePlugins: [],
    },
    parseFrontmatter: true,
  });

export type SerializeNutshellsResult = {
  definitions: NutshellDefinitionsMap;
  terms: { [permalink: string]: string };
};

export const serializeNutshells = async (
  nutshellFiles: string[]
): Promise<SerializeNutshellsResult> => {
  const definitions = {} as NutshellDefinitionsMap;
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
