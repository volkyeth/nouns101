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
  HStack,
  SimpleGrid,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { Shadow } from "../../../components/Shadow";
import { ArrowUp } from "../../../components/Icons";
import Link from "next/link";
import dynamic from "next/dynamic";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { readdirSync, existsSync } from "fs";
import { NutshellDefinitions } from "../../../components/Nouns101MdxProvider";
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  motion,
  MotionProps,
} from "framer-motion";
import { useIsMobile } from "../../../hooks/mobile";

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    // @ts-ignore
    params: { chapterNumber, section },
  } = context;

  const amountSections = readdirSync(
    `content/chapters/${chapterNumber}/sections`
  ).length;

  const sectionNumber = parseInt(section);
  const previousSection =
    sectionNumber > 1
      ? `/chapters/${chapterNumber}/${sectionNumber - 1}`
      : null;
  const nextSection =
    sectionNumber + 1 <= amountSections
      ? `/chapters/${chapterNumber}/${sectionNumber + 1}`
      : null;

  return {
    props: {
      chapterNumber,
      sectionNumber,
      previousSection,
      nextSection,
      amountSections,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = readdirSync("content/chapters").flatMap((chapterNumber) =>
    readdirSync(`content/chapters/${chapterNumber}/sections`).map(
      (sectionFile) => {
        const section = sectionFile.split(".")[0];
        return {
          params: {
            chapterNumber,
            section,
          },
        };
      }
    )
  );
  return {
    paths,
    fallback: false,
  };
};

type ChapterSectionProps = {
  chapterNumber: number;
  sectionNumber: number;
  previousSection: string;
  nextSection: string | null;
  amountSections: number;
};

const ChapterSection: FC<ChapterSectionProps> = ({
  chapterNumber,
  sectionNumber,
  previousSection,
  nextSection,
  amountSections,
}) => {
  const isMobile = useIsMobile();
  const {push} = useRouter()
  const SectionContent = dynamic(
    () =>
      import(
        `../../../content/chapters/${chapterNumber}/sections/${sectionNumber}.mdx`
      ),
    {
      ssr: true,
    }
  );

  const pixelBoxProps: Partial<ShadowedPixelBoxProps & MotionProps> = {
    as: motion.div,
    // position: "absolute",
    h: "65vh",
    w: {base: "full", md: "xl"},
    initial: { x: "-50vw" },
    animate: { x: 0 },
    exit: { x: "-100vw" },
  };

  // @ts-ignore
  return (
    <Main>
      <HStack h={"full"} w={"full"} alignItems={"center"} justifyContent={"space-evenly"} >
        {!isMobile && <Box w={"80px"}>
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
        </Box>}
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
                if (event.pointerType !== "touch") {
                  return
                }
                const {delta, offset, velocity } = info
                console.log({delta: delta.x, offset: offset.x, velocity: velocity.x})
                if (info.velocity.x < -100 && nextSection) {
                  push(nextSection)
                }

                if (info.velocity.x > 100 && previousSection) {
                  push(previousSection)
                }
              }}
              py={8}
              px={[2,8]}
            >
              <VStack h="full" px={[6,0]} alignItems={"start"} overflowY={"scroll"} style={{touchAction: "pan-y"}}>
                <SectionContent />
              </VStack>
            </ShadowedPixelBox>
          </AnimatePresence>
        </Box>
        {!isMobile && <Box w={"80px"}>
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
        </Box>}
      </HStack>
    </Main>
  );
};

export default ChapterSection;
