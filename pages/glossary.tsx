import { FC } from "react";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { MainLayout } from "../components/MainLayout";
import Link from "next/link";
import { ShadowedPixelBox } from "../components/ShadowedPixelBox";
import { Nutshell } from "../components/Nutshell";
import openImg from "../assets/open.svg";
import Image from "next/image";
import { PixelTooltip } from "../components/PixelTooltip";
import { CopyLinkButton } from "../components/CopyLinkButton";
import client from "../.tina/__generated__/client";
import { Glossary } from "../.tina/__generated__/types";
import { basename } from "path";

export const getStaticProps: GetStaticProps<GlossaryProps> = async () => {
  const glossaryEntries = await client.queries
    .glossaryConnection({
      first: 100000,
      filter: { hide: { eq: false } },
      sort: "title",
    })!
    .then((res) =>
      res!.data!.glossaryConnection!.edges!.map(
        (edge) => edge!.node as Glossary
      )
    );

  return {
    props: {
      glossaryEntries,
    },
  };
};

type GlossaryProps = {
  glossaryEntries: Glossary[];
};

const Glossary: FC<GlossaryProps> = ({ glossaryEntries }) => {
  return (
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
            {glossaryEntries.map(({ title, body, id }) => {
              const permalink = basename(id, ".mdx");
              return (
                <VStack
                  key={title}
                  spacing={-1}
                  alignItems={"start"}
                  w={"full"}
                >
                  <Nutshell body={body}>{title}</Nutshell>
                  <HStack position={"absolute"} right={0} pr={10}>
                    <PixelTooltip label={"Open definition page"}>
                      <Link key={title} href={`/glossary/${permalink}`}>
                        <Image src={openImg} alt={"open definition"} />
                      </Link>
                    </PixelTooltip>
                    <CopyLinkButton link={`/glossary/${permalink}`} />
                  </HStack>
                </VStack>
              );
            })}
          </VStack>
        </ShadowedPixelBox>
      </VStack>
    </MainLayout>
  );
};

export default Glossary;
