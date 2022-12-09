import { FC } from "react";
import {
  Center,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { readdirSync } from "fs";
import { MDXRemote } from "next-mdx-remote";
import { basename } from "path";
import { serializeNutshells, SerializeNutshellsResult } from "../../utils/mdx";
import { NutshellDefinitions } from "../../components/Nouns101MdxProvider";
import { MainLayout } from "../../components/MainLayout";
import { ShadowedPixelBox } from "../../components/ShadowedPixelBox";
import { CopyLinkButton } from "../../components/CopyLinkButton";
import { join } from "lodash";
import { DefinitionCard } from "../../components/DefinitionCard";

export const getStaticProps: GetStaticProps<
  GlossaryEntryProps,
  { permalink: string }
> = async (context) => {
  const { permalink } = context.params!;
  const glossaryNutshellFiles = readdirSync("content/glossary").map(
    (filename) => `content/glossary/${filename}`
  );

  return {
    props: {
      ...(await serializeNutshells(glossaryNutshellFiles)),
      permalink,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = readdirSync("content/glossary").map((entryFile) => {
    const permalink = basename(entryFile, ".mdx");
    return {
      params: {
        permalink,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

type GlossaryEntryProps = {
  permalink: string;
} & SerializeNutshellsResult;

const GlossaryEntry: FC<GlossaryEntryProps> = ({
  permalink,
  terms,
  definitions,
}) => {
  const definition = definitions[permalink];
  return (
    <NutshellDefinitions.Provider value={definitions}>
      <MainLayout>
        <Center h={"full"}>
          <DefinitionCard definition={definition} permalink={permalink} />
        </Center>
      </MainLayout>
    </NutshellDefinitions.Provider>
  );
};

export default GlossaryEntry;
