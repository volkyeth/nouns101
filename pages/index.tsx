import type { GetStaticProps, NextPage } from "next";
import {
  Center,
  chakra,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import chapter1Meta from "../content/chapters/1/metadata";
import chapter2Meta from "../content/chapters/2/metadata";
import chapter3Meta from "../content/chapters/3/metadata";
import chapter4Meta from "../content/chapters/4/metadata";
import { ChapterCard } from "../components/ChapterCard";
import { useIsMobile } from "../hooks/mobile";
import { MainLayout } from "../components/MainLayout";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import {
  serializeMdx,
  serializeNutshells,
  SerializeNutshellsResult,
} from "../utils/mdx";
import { readdirSync, readFileSync } from "fs";
import { NutshellDefinitions } from "../components/Nutshell";
import { ClippySays } from "../components/ClippySays";

type HomeProps = {
  summaries: { [chapter: number]: MDXRemoteSerializeResult };
} & SerializeNutshellsResult;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const glossaryNutshellFiles = readdirSync("content/glossary").map(
    (filename) => `content/glossary/${filename}`
  );

  const summaries = [];

  for (const chapter of [1, 2, 3, 4]) {
    const summary = readFileSync(`content/chapters/${chapter}/summary.mdx`);
    summaries[chapter] = await serializeMdx(summary.toString());
  }

  return {
    props: {
      ...(await serializeNutshells(glossaryNutshellFiles)),
      summaries,
    },
  };
};

const Home: NextPage<HomeProps> = ({ terms, definitions, summaries }) => {
  const isMobile = useIsMobile();
  return (
    <NutshellDefinitions.Provider value={definitions}>
      <MainLayout>
        <VStack w={"full"} spacing={0}>
          <Center pb={16}>
            <VStack w={"full"}>
              <Heading
                whiteSpace={"nowrap"}
                fontSize={48}
                color={"#DD473F"}
                textShadow={"3px 3px black"}
              >
                Nouns 101
              </Heading>
              <Text
                textAlign={"center"}
                fontFamily={`"LoRes 9 OT", sans-serif;`}
                textTransform={"uppercase"}
              >
                Your first steps into the world of{" "}
                <chakra.mark bgColor={"#FF638D"}>Web3</chakra.mark>,{" "}
                <chakra.mark color={"white"} bgColor={"#EC5B43"}>
                  NFTs
                </chakra.mark>
                , and{" "}
                <chakra.mark color={"white"} bgColor={"#254EFB"}>
                  Nouns DAO
                </chakra.mark>
                .
              </Text>
            </VStack>
          </Center>

          <ClippySays clippyScale={0.5}>
            <VStack maxW={"2xl"} spacing={4}>
              <Text>
                Hi! <b>Welcome to Nouns101!</b> If you’re new to web3 and trying
                to form an understanding and get more involved, you’re in the
                right place!
              </Text>
              <Text>
                Here you’ll find four chapters of content, leading you from web3
                beginner to DAO contributor! Don’t know what a DAO is? Don’t
                worry — We’ll get there! ⌐◨-◨
              </Text>
              <Text>
                <b>Ready to get started?…</b> Select a chapter to begin!
              </Text>
            </VStack>
          </ClippySays>

          <SimpleGrid w={"full"} columns={[1, 2]} gridGap={4}>
            <ChapterCard
              chapterMetadata={chapter1Meta}
              chapterSummary={summaries[1]}
            />
            <ChapterCard
              chapterMetadata={chapter2Meta}
              chapterSummary={summaries[2]}
            />
            <ChapterCard
              chapterMetadata={chapter3Meta}
              chapterSummary={summaries[3]}
            />
            <ChapterCard
              chapterMetadata={chapter4Meta}
              chapterSummary={summaries[4]}
            />
          </SimpleGrid>
        </VStack>
      </MainLayout>
    </NutshellDefinitions.Provider>
  );
};

export default Home;
