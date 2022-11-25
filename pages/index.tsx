import type { NextPage } from "next";
import Image from "next/image";
import {
  Box,
  Center,
  chakra,
  Container,
  ContainerProps,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import bitNoggles from "../assets/bitNoggles.svg";
import lilNoggles from "../assets/lilNoggles.svg";
import noggles from "../assets/noggles.svg";
import monoggle from "../assets/monoggle.svg";

import chapter1 from "../content/chapters/1/summary.mdx";
import chapter2 from "../content/chapters/2/summary.mdx";
import chapter3 from "../content/chapters/3/summary.mdx";
import chapter4 from "../content/chapters/4/summary.mdx";
import { FC } from "react";
import { ShadowedPixelBox } from "../components/ShadowedPixelBox";
import { ChapterCard } from "../components/ChapterCard";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useIsMobile } from "../hooks/mobile";
import { Main } from "../layouts/Main";

const Home: NextPage = () => {
  const isMobile = useIsMobile();
  return (
    <Main>
      <VStack w={"full"} spacing={20}>
        <Center>
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

        <SimpleGrid w={"full"} columns={[1, 2]} gridGap={4}>
          <ChapterCard
            chapterNumber={1}
            chapterTitle={"New to Web3"}
            chapterColor={"#FEE3F3"}
            chapterImage={bitNoggles}
            chapterSummary={chapter1({})}
          />
          <ChapterCard
            chapterNumber={2}
            chapterTitle={"Understanding NFTs"}
            chapterColor={"#FFC8B2"}
            chapterImage={lilNoggles}
            chapterSummary={chapter2({})}
          />
          <ChapterCard
            chapterNumber={3}
            chapterTitle={"NFTs and DAOs"}
            chapterColor={"#DAE6FF"}
            chapterImage={noggles}
            chapterSummary={chapter3({})}
          />
          <ChapterCard
            chapterNumber={4}
            chapterTitle={"Joining a DAO!"}
            chapterColor={"#C8B6FF"}
            chapterImage={monoggle}
            chapterSummary={chapter4({})}
          />
        </SimpleGrid>
      </VStack>
    </Main>
  );
};

export default Home;
