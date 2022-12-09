import { FC, useEffect, useState } from "react";
import { HStack, Textarea, VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { serializeNutshells, SerializeNutshellsResult } from "../utils/mdx";
import { NutshellDefinitions } from "../components/Nouns101MdxProvider";
import { MainLayout } from "../components/MainLayout";
import { ShadowedPixelBox } from "../components/ShadowedPixelBox";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Nutshell } from "../components/Nutshell";
import { useDebounce } from "../utils/debounce";
import { readdirSync } from "fs";
import { DefinitionCard } from "../components/DefinitionCard";

export const getStaticProps: GetStaticProps<
  EditorProps,
  { permalink: string }
> = async () => {
  const glossaryNutshellFiles = readdirSync("content/glossary").map(
    (filename) => `content/glossary/${filename}`
  );

  return {
    props: {
      ...(await serializeNutshells(glossaryNutshellFiles)),
    },
  };
};

type EditorProps = {} & SerializeNutshellsResult;

const Editor: FC<EditorProps> = ({ terms, definitions }) => {
  const [mdx, setMdx] = useState(placeholderContent);
  const { debouncedState: debouncedMdx, changed } = useDebounce(mdx, 2000);
  const [serializedMdx, setSerializedMdx] =
    useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    fetch("api/serialize", {
      method: "POST",
      body: debouncedMdx,
    })
      .then((r) => r.json())
      .then(async (serializedMdx) => ({
        ...serializedMdx!,
      }))
      .then(setSerializedMdx);
  }, [debouncedMdx]);
  return (
    <NutshellDefinitions.Provider value={definitions}>
      <MainLayout maxW={"container.xl"}>
        <HStack w={"full"} h={"full"}>
          <Textarea
            value={mdx}
            onChange={(e) => setMdx(e.target.value)}
            bgColor={"white"}
            h={"full"}
            flexGrow={1}
          />

          <VStack>
            {serializedMdx && (
              <DefinitionCard
                definition={serializedMdx}
                permalink={"Missing title"}
              />
            )}
            <ShadowedPixelBox
              w={"full"}
              p={10}
              fontFamily={`"LoRes 12 OT",sans-serif`}
            >
              <Nutshell
                term={serializedMdx?.frontmatter?.title ?? "nutshell"}
                isOpen
              >
                <VStack alignItems={"start"} w={"full"}>
                  {serializedMdx && <MDXRemote {...serializedMdx} />}
                </VStack>
              </Nutshell>
            </ShadowedPixelBox>
          </VStack>
        </HStack>
      </MainLayout>
    </NutshellDefinitions.Provider>
  );
};

const hash = async (string: string) => {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((bytes) => bytes.toString(16).padStart(2, "0")).join("");
};

const placeholderContent = `---
title: Nouns
aliases: 
   - Nouns DAO
seeAlso: NFT, DAO
externalReferences:
  "NounsDAO": "https://nouns.wtf"
---

# Here's a heading

## Here's a subheading

content goes here
`;

export default Editor;
