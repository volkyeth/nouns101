import { FC, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import {
  ShadowedPixelBox,
  ShadowedPixelBoxProps,
} from "../../../components/ShadowedPixelBox";
import { Main } from "../../../layouts/Main";
import {
  Box,
  forwardRef,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  chakra,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Shadow } from "../../../components/Shadow";
import { ArrowUp } from "../../../components/Icons";
import Link from "next/link";
import dynamic from "next/dynamic";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { readdirSync, existsSync, readFileSync } from "fs";
import { NutshellDefinitions } from "../../../components/Nouns101MdxProvider";
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  motion,
  MotionProps,
} from "framer-motion";
import { useIsMobile } from "../../../hooks/mobile";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
// @ts-ignore
import wikiLinkPlugin from "remark-wiki-link";
import * as fs from "fs";
import { basename } from "path";
import { serializeMdx, serializeNutshells } from "../../../utils/mdx";
import { ChapterMetadata } from "../../../utils/metadata";
import Image from "next/image";
import { ProgressBar } from "../../../components/ProgressBar";
import poap from "../../../assets/poap.svg";

export const getStaticProps: GetStaticProps<ChapterSectionProps> = async (
  context
) => {
  const { chapterId, section } = context.params as {
    chapterId: string;
    section: string;
  };
  const glossaryNutshellFiles = readdirSync("content/glossary").map(
    (filename) => `content/glossary/${filename}`
  );
  const chapterNutshellFiles = readdirSync(
    `content/chapters/${chapterId}/nutshells`
  ).map((filename) => `content/chapters/${chapterId}/nutshells/${filename}`);
  const nutshellFiles = [
    ...glossaryNutshellFiles,
    ...chapterNutshellFiles,
  ].filter((filename) => filename.split(".")[1] === "mdx");
  const permalinks = nutshellFiles.map((filename) =>
    basename(filename, ".mdx")
  );

  const nutshellDefinitions = await serializeNutshells(
    nutshellFiles,
    permalinks
  );

  const sectionFile = `content/chapters/${chapterId}/sections/${section}.mdx`;
  const serializedSection = await serializeMdx(
    readFileSync(sectionFile).toString(),
    permalinks
  );

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
      serializedSection,
      serializedNutshells: nutshellDefinitions,
      chapterMeta,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = readdirSync("content/chapters").flatMap((chapterId) =>
    readdirSync(`content/chapters/${chapterId}/sections`).map((sectionFile) => {
      const section = sectionFile.split(".")[0];
      return {
        params: {
          chapterId,
          section,
        },
      };
    })
  );
  return {
    paths,
    fallback: false,
  };
};

type ChapterSectionProps = {
  serializedSection: MDXRemoteSerializeResult;
  serializedNutshells: NutshellDefinitions;
  chapterId: string;
  sectionNumber: number;
  previousSection: string | null;
  nextSection: string | null;
  amountSections: number;
  chapterMeta: ChapterMetadata;
};

const ChapterSection: FC<ChapterSectionProps> = ({
  chapterId,
  sectionNumber,
  previousSection,
  nextSection,
  amountSections,
  serializedSection,
  serializedNutshells,
  chapterMeta,
}) => {
  const showArrows = useBreakpointValue({ base: false, lg: true });
  const { push } = useRouter();

  const pixelBoxProps: Partial<ShadowedPixelBoxProps & MotionProps> = {
    as: motion.div,
    // position: "absolute",
    h: "65vh",
    w: { base: "full", md: "xl" },
    initial: { x: "-100vw" },
    animate: { x: 0 },
    exit: { x: "-100vw" },
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
    <Main
      bgColor={chapterMeta.color}
      overflow={"clip"}
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
              Array(amountSections - sectionNumber)
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
              // @ts-ignore
              onPanEnd={(event, info) => {
                if (
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
                <NutshellDefinitions.Provider value={serializedNutshells}>
                  <MDXRemote {...serializedSection} />
                </NutshellDefinitions.Provider>
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
    </Main>
  );
};

export default ChapterSection;
