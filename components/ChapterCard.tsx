import { ReactNode } from "@mdx-js/react/lib";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionProps,
  chakra,
  Heading,
  HStack,
  Spacer,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import Image from "next/image";
import arrow from "../assets/arrowDown.svg";
import { AutoExpander } from "./AutoExpander";
import { useIsMobile } from "../hooks/mobile";
import { SmallArrowUp } from "./Icons";
import { Shadow } from "./Shadow";
import { PixelButton } from "./PixelButton";
import Link from "next/link";

export type ChapterCardProps = {
  chapterTitle: string;
  chapterSummary: ReactNode;
  chapterColor: string;
  chapterImage: string;
  chapterNumber: number;
} & AccordionProps;

export const ChapterCard: FC<ChapterCardProps> = ({
  chapterNumber,
  chapterTitle,
  chapterColor,
  chapterImage,
  chapterSummary,
  ...props
}) => {
  const isMobile = useIsMobile();
  return (
    <Accordion
      allowToggle
      borderWidth={2}
      borderColor={"black"}
      boxShadow={"6px 6px black"}
      {...props}
      defaultIndex={isMobile ? undefined : 0}
    >
      <AccordionItem isDisabled={!isMobile} h={"full"} bg={"#FFE7BF"}>
        {({ isExpanded }) => (
          <>
            <AutoExpander expand={!isMobile} />
            <AccordionButton
              bg={chapterColor}
              py={4}
              px={[2, 8]}
              borderBottomWidth={2}
              borderColor={"black"}
              disabled={!isMobile}
              _disabled={{ opacity: "inherit", cursor: "initial" }}
              _hover={{ bgColor: chapterColor }}
            >
              <HStack w={"full"} p={0} spacing={[4, 2]}>
                {isMobile && (
                  <chakra.span transform={"rotate(-90deg)"}>
                    <Image src={chapterImage} width={"50px"} />
                  </chakra.span>
                )}
                <VStack
                  flexGrow={1}
                  fontWeight={"bold"}
                  fontFamily={`"LoRes 12 OT",sans-serif`}
                  spacing={0}
                  alignItems={"start"}
                  p={0}
                >
                  <Text fontSize={["xl", "2xl"]} color={"#2245C5"}>
                    Chapter {chapterNumber}
                  </Text>
                  <Heading fontSize={["lg", "2xl"]} as={"h2"}>
                    {chapterTitle}
                  </Heading>
                </VStack>
                {isMobile ? (
                  <Shadow>
                    <SmallArrowUp
                      transformOrigin={"center"}
                      transform={isExpanded ? undefined : "rotate(180deg)"}
                    />
                  </Shadow>
                ) : (
                  <chakra.span alignSelf={"end"}>
                    <Image src={chapterImage} />
                  </chakra.span>
                )}
              </HStack>
            </AccordionButton>
            <AccordionPanel fontSize={"sm"} py={4} px={8}>
              <VStack h={"full"} w={"full"} alignItems={"start"}>
                {chapterSummary}
                <Link href={`/chapters/${chapterNumber}/1`}>
                  <PixelButton shadowColor={"nouns101.blue"} alignSelf={"end"}>
                    Read
                  </PixelButton>
                </Link>
              </VStack>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};
