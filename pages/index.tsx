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
import { ClippySays } from "../components/ClippySays";
import client from "../.tina/__generated__/client";
import { DefinitionCard } from "../components/DefinitionCard";
import { useTina } from "tinacms/dist/react";

type HomeProps = {
  aboutNouns101: Awaited<ReturnType<typeof client.queries.glossary>>;
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const aboutNouns101 = await client.queries.glossary({
    relativePath: "Nouns101.mdx",
  });

  aboutNouns101.data.glossary.title = "About Nouns 101";

  return {
    props: {
      aboutNouns101,
    },
  };
};

const Home: NextPage<HomeProps> = ({ aboutNouns101 }) => {
  const isMobile = useIsMobile();
  const {
    data: { glossary: aboutProject },
  } = useTina(aboutNouns101);
  return (
    <MainLayout
      contentWrapperProps={{
        bgGradient:
          "linear(to-b, #FFE7BF00 0%, #FFE7BF00 80%, #FFE7BF40 80%, #FFE7BF40 85%, #FFE7BF80 85%, #FFE7BF80 90%, #FFE7BFC0 90%,#FFE7BFC0 95%,#FFE7BFFF 95%,#FFE7BFFF )",
      }}
    >
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

        <ClippySays clippyScale={0.5} fontFamily={`"LoRes 12 OT", sans-serif`}>
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
              <b>Ready to get started?…</b> Select a chapter to begin!
            </Text>
          </VStack>
        </ClippySays>

        <SimpleGrid
          w={"full"}
          columns={[1, 2]}
          gridGap={4}
          fontFamily={`"LoRes 12 OT", sans-serif`}
        >
          <ChapterCard chapterMetadata={chapter1Meta}>
            <Text>
              What's Crypto and DeFi all about? Sounds like Greek to me..."
            </Text>

            <Text>If that is what's boggling your mind, fret not.</Text>

            <Text>
              If this is your first steps into the word of "web3" and crypto,
              you're in the right place —
            </Text>

            <Text>
              In this chapter, we will be covering the basics of web3, the
              blockchain, cryptocurrency, and crypto wallets.
            </Text>

            <Text fontWeight={"bold"}>Ready to get started?</Text>
          </ChapterCard>
          <ChapterCard chapterMetadata={chapter2Meta}>
            <Text>
              You’ve broken through the mental barrier, and realized that the
              blockchain is a revolutionary technology to change the world of
              finance.
            </Text>

            <Text>
              But you still can’t wrap your head around **NFTs**. Why would
              anyone (in the right mind) pay a million dollars for a JPEG? _Am I
              really seeing the bigger (digital) picture?_
            </Text>

            <Text>
              In this chapter we’ll breakdown NFTs, and show you how there is
              more than meets the eye.
            </Text>

            <Text fontWeight={"bold"}>Ready to dive in?</Text>
          </ChapterCard>
          <ChapterCard chapterMetadata={chapter3Meta}>
            <Text>
              You have a basic understanding of NFTs and are ready to dig
              deeper. You want to learn about the different types of NFTs,
              communities, and how to get involved.
            </Text>

            <Text>
              Maybe you keep hearing about DAOs, or NFTs with utility and want
              to learn what they’re all about? This chapter is for you!
            </Text>

            <Text fontWeight={"bold"}>Let’s get started…</Text>
          </ChapterCard>
          <ChapterCard chapterMetadata={chapter4Meta}>
            <Text>
              You learned about DAOs in the last chapter, or are familiar and
              want to get involved but aren’t quite sure how. Maybe you’ve heard
              of Nouns DAO, Lil Nouns DAO, Gnars DAO, or Food Nouns DAO and want
              more information on how to participate.
            </Text>

            <Text fontWeight={"bold"}>This chapter is for you!</Text>

            <Text>
              Let’s dive into Nouns DAO, Lil Nouns DAO and the Nounish
              Ecosystem…
            </Text>
          </ChapterCard>
        </SimpleGrid>
        <DefinitionCard
          mt={64}
          definition={aboutProject}
          permalink={""}
          hasLink={false}
        />
      </VStack>
    </MainLayout>
  );
};

export default Home;
