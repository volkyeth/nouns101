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
  return (
    <NutshellDefinitions.Provider value={definitions}>
      <MainLayout>
        <Center h={"full"}>
          <ShadowedPixelBox
            w={"2xl"}
            p={10}
            fontFamily={`"LoRes 12 OT",sans-serif`}
          >
            <VStack alignItems={"start"} spacing={6}>
              <HStack justifyContent={"space-between"} w={"full"}>
                <Heading color={"nouns101.blue"}>
                  {definitions[permalink]!.frontmatter!.title}
                </Heading>
                <CopyLinkButton link={`/glossary/${permalink}`} />
              </HStack>
              <VStack w={"full"} spacing={0} alignItems={"start"}>
                <Divider borderWidth={1} opacity={1} borderColor={"gray.700"} />
                {(definitions[permalink]?.frontmatter?.aliases?.length ?? 0) >
                  0 && (
                  <Text
                    fontWeight={"semibold"}
                    color={"gray.700"}
                  >{`AKA: ${join(
                    definitions[permalink]!.frontmatter!.aliases,
                    ", "
                  )}`}</Text>
                )}
              </VStack>
              <VStack alignItems={"start"} w={"full"}>
                <MDXRemote {...definitions[permalink]} />
              </VStack>
            </VStack>
          </ShadowedPixelBox>
        </Center>
      </MainLayout>
    </NutshellDefinitions.Provider>
  );
};

export default GlossaryEntry;
