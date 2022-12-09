import { FC } from "react";
import { chakra, Heading, HStack, VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { readdirSync } from "fs";
import { serializeNutshells, SerializeNutshellsResult } from "../utils/mdx";
import { NutshellDefinitions } from "../components/Nouns101MdxProvider";
import { MainLayout } from "../components/MainLayout";
import Link from "next/link";
import { ShadowedPixelBox } from "../components/ShadowedPixelBox";
import { Nutshell } from "../components/Nutshell";
import { MDXRemote } from "next-mdx-remote";
import openImg from "../assets/open.svg";
import Image from "next/image";
import { PixelTooltip } from "../components/PixelTooltip";
import { CopyLinkButton } from "../components/CopyLinkButton";

export const getStaticProps: GetStaticProps<
  SerializeNutshellsResult
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

const Glossary: FC<SerializeNutshellsResult> = ({ terms, definitions }) => {
  return (
    <NutshellDefinitions.Provider value={definitions}>
      <MainLayout centerContent>
        <VStack spacing={10} w={"full"}>
          <Heading
            fontFamily={`"LoRes 12 OT",sans-serif`}
            color={"nouns101.blue"}
          >
            Glossary
          </Heading>
          <ShadowedPixelBox w={["full", "2xl"]}>
            <VStack
              p={[4, 10]}
              fontFamily={`"LoRes 12 OT",sans-serif`}
              fontSize={["md", "lg"]}
              spacing={2}
            >
              {Object.entries(terms).map(([permalink, title]) => (
                <VStack
                  key={permalink}
                  spacing={-1}
                  alignItems={"start"}
                  w={"full"}
                >
                  <Nutshell term={title}>
                    <chakra.span>
                      <MDXRemote {...definitions[permalink]} />
                    </chakra.span>
                  </Nutshell>
                  <HStack position={"absolute"} right={0} pr={10}>
                    <PixelTooltip label={"Open definition page"}>
                      <Link key={permalink} href={`/glossary/${permalink}`}>
                        <Image src={openImg} alt={"open definition"} />
                      </Link>
                    </PixelTooltip>
                    <CopyLinkButton link={`/glossary/${permalink}`} />
                  </HStack>
                </VStack>
              ))}
            </VStack>
          </ShadowedPixelBox>
        </VStack>
      </MainLayout>
    </NutshellDefinitions.Provider>
  );
};

export default Glossary;
