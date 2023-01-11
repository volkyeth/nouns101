import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import {
  ShadowedPixelBox,
  ShadowedPixelBoxProps,
} from "../../../components/ShadowedPixelBox";
import { MainLayout } from "../../../components/MainLayout";
import {
  Box,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
  chakra,
} from "@chakra-ui/react";
import { Shadow } from "../../../components/Shadow";
import { ArrowUp } from "../../../components/Icons";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { readdirSync } from "fs";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { ChapterMetadata } from "../../../utils/metadata";
import Image from "next/image";
import { ProgressBar } from "../../../components/ProgressBar";
import client from "../../../.tina/__generated__/client";
import { basename } from "path";
import { useTina } from "tinacms/dist/react";
import { Markdown } from "../../../components/Markdown";
import { useReward } from "react-rewards";

const getQuery = (chapterId: string, section: string) => {
  switch (chapterId) {
    case "1":
      return client.queries.chapter1({
        relativePath: `${section}.mdx`,
      });
    case "2":
      return client.queries.chapter2({
        relativePath: `${section}.mdx`,
      });
    case "3":
      return client.queries.chapter3({
        relativePath: `${section}.mdx`,
      });
    case "4":
      return client.queries.chapter4({
        relativePath: `${section}.mdx`,
      });
    default:
      throw new Error("Invalid chapter id");
  }
};

export const getStaticProps: GetStaticProps<ChapterSectionProps> = async (
  context
) => {
  const { chapterId, section } = context.params as {
    chapterId: string;
    section: string;
  };

  const content = await getQuery(chapterId, section);

  const amountSections = readdirSync(
    `content/chapters/${chapterId}/sections`
  ).length;

  const chapterMeta = (await import(`content/chapters/${chapterId}/metadata`))
    .default as ChapterMetadata;

  const chapterNumber = parseInt(chapterId);
  const previousChapter = chapterNumber > 1 ? chapterNumber - 1 : null;
  const previousChapterLastSection = previousChapter
    ? readdirSync(`content/chapters/${previousChapter}/sections`).length
    : null;
  const nextChapter = chapterNumber < 4 ? chapterNumber + 1 : null;

  const sectionNumber = parseInt(section);
  const previousSection =
    sectionNumber > 1
      ? `/chapters/${chapterId}/${sectionNumber - 1}`
      : previousChapter
      ? `/chapters/${previousChapter}/${previousChapterLastSection}`
      : null;
  const nextSection =
    sectionNumber + 1 <= amountSections
      ? `/chapters/${chapterId}/${sectionNumber + 1}`
      : nextChapter
      ? `/chapters/${nextChapter}/1`
      : null;

  return {
    props: {
      chapterId,
      sectionNumber,
      previousSection,
      nextSection,
      amountSections,
      chapterMeta,
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = await Promise.all([
    client.queries.chapter1Connection().then((chapter) => ({
      chapterId: "1",
      edges: chapter.data.chapter1Connection.edges,
    })),
    client.queries.chapter2Connection().then((chapter) => ({
      chapterId: "2",
      edges: chapter.data.chapter2Connection.edges,
    })),
    client.queries.chapter3Connection().then((chapter) => ({
      chapterId: "3",
      edges: chapter.data.chapter3Connection.edges,
    })),
    client.queries.chapter4Connection().then((chapter) => ({
      chapterId: "4",
      edges: chapter.data.chapter4Connection.edges,
    })),
  ]).then((chapters) =>
    chapters.flatMap(({ chapterId, edges }) =>
      edges!.map((page) => {
        return {
          params: {
            chapterId,
            section: basename(page!.node!._sys.filename, "mdx"),
          },
        };
      })
    )
  );

  return {
    paths,
    fallback: false,
  };
};

type ChapterQuery =
  | typeof client.queries.chapter1
  | typeof client.queries.chapter2
  | typeof client.queries.chapter3
  | typeof client.queries.chapter4;

type ChapterSectionProps = {
  chapterId: string;
  sectionNumber: number;
  previousSection: string | null;
  nextSection: string | null;
  amountSections: number;
  chapterMeta: ChapterMetadata;
  content: Awaited<ReturnType<ChapterQuery>>;
};

const ChapterSection: FC<ChapterSectionProps> = ({
  chapterId,
  sectionNumber,
  previousSection,
  nextSection,
  amountSections,
  chapterMeta,
  content,
}) => {
  const showArrows = useBreakpointValue({ base: false, lg: true });
  const isLastPage = sectionNumber === amountSections;
  const { reward, isAnimating } = useReward("confetti-gun", "confetti", {
    lifetime: 500,
    spread: 100,
    zIndex: 1000,
  });
  useEffect(() => {
    if (isLastPage && !isAnimating) {
      setTimeout(() => reward(), 1000);
    }
  }, [isLastPage]);

  const { push } = useRouter();
  // @ts-ignore
  const { data } = useTina(content);

  const section =
    // @ts-ignore
    data?.chapter1 ?? data?.chapter2 ?? data?.chapter3 ?? data?.chapter4;

  const pixelBoxProps: Partial<ShadowedPixelBoxProps & MotionProps> = {
    as: motion.div,
    h: "full",
    minH: "65vh",
    w: { base: "full", md: "xl" },
  };

  // @ts-ignore
  return (
    <MainLayout
      bgColor={chapterMeta.color}
      contentWrapperProps={{ bgGradient: undefined }}
      navbarExtraContent={
        <VStack
          w={"full"}
          fontWeight={"bold"}
          fontFamily={`"LoRes 12 OT",sans-serif`}
          spacing={[0, 2]}
        >
          <HStack
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <VStack spacing={0} alignItems={"start"} p={0}>
              <Text fontSize={["xl", "2xl"]} color={"#2245C5"}>
                Chapter {chapterMeta.id}
              </Text>
              <Heading fontSize={["lg", "2xl"]} as={"h2"}>
                {chapterMeta.title}
              </Heading>
            </VStack>
            <Image alt={"noggles"} src={chapterMeta.image} width={60} />
          </HStack>
          <HStack w={"full"}>
            <Text>
              {sectionNumber}/{amountSections}
            </Text>
            <ProgressBar
              flexGrow={1}
              amountSegments={amountSections}
              currentSegment={sectionNumber}
            />
          </HStack>
        </VStack>
      }
    >
      <HStack w={"full"} alignItems={"start"} justifyContent={"space-evenly"}>
        {showArrows && (
          <Box w={"80px"} pt={96}>
            {previousSection && (
              <Shadow>
                <Link href={previousSection}>
                  <ArrowUp
                    cursor={"pointer"}
                    _hover={{
                      color:
                        sectionNumber === 1
                          ? "nouns101.lightRed"
                          : "nouns101.lightBlue",
                    }}
                    boxSize={20}
                    color={
                      sectionNumber === 1 ? "nouns101.red" : "nouns101.blue"
                    }
                    transform={"rotate(-90deg)"}
                  />
                </Link>
              </Shadow>
            )}
          </Box>
        )}
        <VStack alignItems={"center"}>
          <chakra.span id={"confetti-gun"} />
          <Box
            display={"grid"}
            id={"page-content"}
            fontFamily={`"LoRes 12 OT",sans-serif`}
          >
            <AnimatePresence initial={false} mode={"popLayout"}>
              {amountSections - sectionNumber > 0 &&
                Array(Math.min(amountSections - sectionNumber, 8))
                  .fill(null)
                  .map((_, idx) => (
                    <ShadowedPixelBox
                      gridArea={"1/1/1/1"}
                      transform={`translateX(${8 * (idx + 1)}px) translateY(${
                        8 * (idx + 1)
                      }px)`}
                      key={`section-${sectionNumber + idx + 1}`}
                      {...pixelBoxProps}
                    />
                  ))
                  .reverse()}
              <ShadowedPixelBox
                minH={"full"}
                gridArea={"1/1/1/1"}
                key={`section-${sectionNumber}`}
                {...pixelBoxProps}
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                exit={{ x: "-100vw" }}
                onPanEnd={(event, info) => {
                  if (
                    // @ts-ignore
                    event.pointerType !== "touch" ||
                    event.type === "pointercancel"
                  ) {
                    return;
                  }
                  const { offset } = info;
                  if (offset.x < -40 && nextSection) {
                    push(nextSection);
                  }

                  if (offset.x > 40 && previousSection) {
                    push(previousSection);
                  }
                }}
                py={4}
                px={[2, 8]}
              >
                <VStack
                  h="full"
                  px={[6, 0]}
                  alignItems={"start"}
                  pb={4}
                  // overflowY={"scroll"}
                  style={{ touchAction: "pan-y" }}
                >
                  <VStack
                    spacing={0}
                    alignItems={"start"}
                    p={0}
                    pb={[4, 8]}
                    fontWeight={"bold"}
                    w={"full"}
                  >
                    <Text
                      alignSelf={"end"}
                      fontSize={"lg"}
                      fontWeight={"bold"}
                      color={"#2245C5"}
                      pb={2}
                    >
                      {sectionNumber}/{amountSections}
                    </Text>
                    {section?.title && (
                      <Heading fontSize={["lg", "2xl"]} as={"h2"}>
                        {section.title}
                      </Heading>
                    )}
                  </VStack>
                  <Markdown content={section.body} />
                </VStack>
              </ShadowedPixelBox>
            </AnimatePresence>
          </Box>
        </VStack>
        {showArrows && (
          <Box w={"80px"} pt={96}>
            {nextSection && (
              <Shadow>
                <Link href={nextSection}>
                  <ArrowUp
                    cursor={"pointer"}
                    _hover={{
                      color:
                        sectionNumber === amountSections
                          ? "nouns101.lightRed"
                          : "nouns101.lightBlue",
                    }}
                    boxSize={20}
                    color={
                      sectionNumber === amountSections
                        ? "nouns101.red"
                        : "nouns101.blue"
                    }
                    transform={"rotate(90deg)"}
                  />
                </Link>
              </Shadow>
            )}
          </Box>
        )}
      </HStack>
    </MainLayout>
  );
};

export default ChapterSection;
