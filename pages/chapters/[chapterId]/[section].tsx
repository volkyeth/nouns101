import { FC } from "react";
import { useRouter } from "next/router";
import {
  ShadowedPixelBox,
  ShadowedPixelBoxProps,
} from "../../../components/ShadowedPixelBox";
import { MainLayout } from "../../../components/MainLayout";
import {
  Box,
  chakra,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { Shadow } from "../../../components/Shadow";
import { ArrowUp } from "../../../components/Icons";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { readdirSync, readFileSync } from "fs";
import {
  AnimatePresence,
  isValidMotionProp,
  motion,
  MotionProps,
} from "framer-motion";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serializeMdx, serializeNutshells } from "../../../utils/mdx";
import { ChapterMetadata } from "../../../utils/metadata";
import Image from "next/image";
import { ProgressBar } from "../../../components/ProgressBar";
import poap from "../../../assets/poap.svg";
import {
  NutshellDefinitions,
  NutshellDefinitionsMap,
} from "../../../components/Nutshell";
import client from "../../../.tina/__generated__/client";
import { basename } from "path";
import { useTina } from "tinacms/dist/react";
import { Markdown } from "../../../components/Nouns101MdxProvider";

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

  const sectionNumber = parseInt(section);
  const previousSection =
    sectionNumber > 1 ? `/chapters/${chapterId}/${sectionNumber - 1}` : null;
  const nextSection =
    sectionNumber + 1 <= amountSections
      ? `/chapters/${chapterId}/${sectionNumber + 1}`
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
  const { push } = useRouter();
  // @ts-ignore
  const { data } = useTina(content);

  const section =
    // @ts-ignore
    data?.chapter1 ?? data?.chapter2 ?? data?.chapter3 ?? data?.chapter4;

  const pixelBoxProps: Partial<ShadowedPixelBoxProps & MotionProps> = {
    as: motion.div,
    h: "65vh",
    w: { base: "full", md: "xl" },
  };

  const poapWidth = useBreakpointValue([32, 54]);
  const poapStyle = useBreakpointValue([
    {
      marginLeft: "-14px",
      marginBottom: "-6px",
    },
    {
      marginTop: "-16px",
      marginLeft: "-30px",
      marginBottom: "-30px",
    },
  ]);

  // @ts-ignore
  return (
    <MainLayout
      bgColor={chapterMeta.color}
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
          <HStack w={"full"} pb={[1, 6]}>
            <Text>
              {sectionNumber}/{amountSections}
            </Text>
            <ProgressBar
              flexGrow={1}
              amountSegments={amountSections}
              currentSegment={sectionNumber}
            />
            <Image
              alt={"poap"}
              src={poap}
              width={poapWidth}
              style={poapStyle}
            />
          </HStack>
        </VStack>
      }
    >
      <HStack
        h={"full"}
        w={"full"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        {showArrows && (
          <Box w={"80px"}>
            {previousSection && (
              <Shadow>
                <Link href={previousSection}>
                  <ArrowUp
                    cursor={"pointer"}
                    _hover={{ color: "nouns101.lightBlue" }}
                    boxSize={20}
                    color={"nouns101.blue"}
                    transform={"rotate(-90deg)"}
                  />
                </Link>
              </Shadow>
            )}
          </Box>
        )}
        <Box display={"grid"}>
          <AnimatePresence initial={false}>
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
              py={8}
              px={[2, 8]}
            >
              <VStack
                h="full"
                px={[6, 0]}
                alignItems={"start"}
                overflowY={"scroll"}
                style={{ touchAction: "pan-y" }}
              >
                <VStack
                  spacing={0}
                  alignItems={"start"}
                  p={0}
                  pb={[4, 8]}
                  fontWeight={"bold"}
                  fontFamily={`"LoRes 12 OT",sans-serif`}
                >
                  {sectionNumber < amountSections && (
                    <Text fontSize={["xl", "2xl"]} color={"#2245C5"}>
                      Section {sectionNumber}
                    </Text>
                  )}
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
        {showArrows && (
          <Box w={"80px"}>
            {nextSection && (
              <Shadow>
                <Link href={nextSection}>
                  <ArrowUp
                    cursor={"pointer"}
                    _hover={{ color: "nouns101.lightBlue" }}
                    boxSize={20}
                    color={"nouns101.blue"}
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
