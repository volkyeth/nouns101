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
import { CtaButton, PixelButton } from "./PixelButton";
import Link from "next/link";
import { ChapterMetadata } from "../utils/metadata";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

export type ChapterCardProps = {
  chapterMetadata: ChapterMetadata;
  chapterSummary: MDXRemoteSerializeResult;
} & AccordionProps;

export const ChapterCard: FC<ChapterCardProps> = ({
  chapterMetadata,
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
              bg={chapterMetadata.color}
              py={4}
              px={[2, 8]}
              borderBottomWidth={2}
              borderColor={"black"}
              disabled={!isMobile}
              _disabled={{ opacity: "inherit", cursor: "initial" }}
              _hover={{ bgColor: chapterMetadata.color }}
            >
              <HStack w={"full"} p={0} spacing={[4, 2]}>
                {isMobile && (
                  <chakra.span transform={"rotate(-90deg)"}>
                    <Image
                      src={chapterMetadata.image}
                      alt={"Noggles"}
                      width={50}
                    />
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
                    Chapter {chapterMetadata.id}
                  </Text>
                  <Heading
                    fontSize={["lg", "2xl"]}
                    as={"h2"}
                    textAlign={"start"}
                  >
                    {chapterMetadata.title}
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
                    <Image src={chapterMetadata.image} alt={"Noggles"} />
                  </chakra.span>
                )}
              </HStack>
            </AccordionButton>
            <AccordionPanel fontSize={"sm"} py={4} px={8}>
              <VStack h={"full"} w={"full"} alignItems={"start"}>
                <MDXRemote {...chapterSummary} />
                <Link
                  href={`/chapters/${chapterMetadata.id}/1`}
                  style={{ alignSelf: "end" }}
                >
                  <CtaButton shadowColor={"nouns101.blue"} colorScheme={"blue"}>
                    Read
                  </CtaButton>
                </Link>
              </VStack>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};
