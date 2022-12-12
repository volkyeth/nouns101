import type { NextPage } from "next";
import {
  Center,
  chakra,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import chapter1 from "../content/chapters/1/summary.mdx";
import chapter1Meta from "../content/chapters/1/metadata";
import chapter2 from "../content/chapters/2/summary.mdx";
import chapter2Meta from "../content/chapters/2/metadata";
import chapter3 from "../content/chapters/3/summary.mdx";
import chapter3Meta from "../content/chapters/3/metadata";
import chapter4 from "../content/chapters/4/summary.mdx";
import chapter4Meta from "../content/chapters/4/metadata";
import { ChapterCard } from "../components/ChapterCard";
import { useIsMobile } from "../hooks/mobile";
import { MainLayout } from "../components/MainLayout";
import { ClippySays } from "../components/ClippySays";

const Home: NextPage = () => {
  const isMobile = useIsMobile();
  return (
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
              beginner to DAO contributor! Don’t know what a DAO is? Don’t worry
              — We’ll get there! ⌐◨-◨
            </Text>
            <Text>
              After completing each chapter, you’ll receive a reward in the form
              of a POAP. This will not only be a free NFT, but can be used to
              prove you’ve completed this course in the future. Think of these
              as merit badges 🥇
            </Text>
            <Text>
              <b>Ready to get started?…</b> Select a chapter to begin!
            </Text>
          </VStack>
        </ClippySays>

        <SimpleGrid w={"full"} columns={[1, 2]} gridGap={4}>
          <ChapterCard
            chapterMetadata={chapter1Meta}
            chapterSummary={chapter1({})}
          />
          <ChapterCard
            chapterMetadata={chapter2Meta}
            chapterSummary={chapter2({})}
          />
          <ChapterCard
            chapterMetadata={chapter3Meta}
            chapterSummary={chapter3({})}
          />
          <ChapterCard
            chapterMetadata={chapter4Meta}
            chapterSummary={chapter4({})}
          />
        </SimpleGrid>
      </VStack>
    </MainLayout>
  );
};

export default Home;
