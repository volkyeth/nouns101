import { createContext, FC, ReactNode, useContext } from "react";
import {
  Box,
  Link,
  Spacer,
  StackProps,
  Text,
  useDisclosure,
  useToken,
  VStack,
} from "@chakra-ui/react";
import { ShadowedPixelBox } from "./ShadowedPixelBox";
import { SmallArrowUp } from "./Icons";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { GlossaryQuery } from "../.tina/__generated__/types";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import client from "../.tina/__generated__/client";
import { basename } from "path";
import { useTina } from "tinacms/dist/react";
import { useQuery } from "react-query";

export type NutshellProps = {
  glossaryEntry?: string;
  body?: TinaMarkdownContent;
  forceOpen?: boolean;
  children?: ReactNode;
} & StackProps;

export const Nutshell: FC<NutshellProps> = ({
  glossaryEntry,
  body,
  children,
  forceOpen = false,
  ...props
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const nouns101Blue = useToken("colors", "nouns101.blue");
  const expanded = forceOpen || isOpen;
  const { data } = useQuery(
    glossaryEntry ?? "",
    ({ queryKey }) => {
      const relativePath = basename(queryKey[0]);
      return client.queries.glossary({ relativePath }).then((r) => r.data);
    },
    {
      enabled: !!glossaryEntry,
    }
  );

  if (!body && !glossaryEntry) {
    return (
      <Text color={"red"} fontWeight={"extrabold"} display={"inline"}>
        :{children}:
      </Text>
    );
  }

  const content = data?.glossary?.body ?? body;

  return (
    <>
      <VStack
        display={"inline-flex"}
        spacing={0}
        verticalAlign={"top"}
        textAlign={"center"}
        {...props}
      >
        <Link
          variant={"unstyled"}
          color={nouns101Blue}
          fontWeight={"extrabold"}
          onClick={onToggle}
        >
          :{children}:
        </Link>
        {expanded && <SmallArrowUp viewBox={"0 0 27 15"} color={"#E9F0FF"} />}
      </VStack>
      {expanded && (
        <>
          <Box>
            <ShadowedPixelBox
              bgColor={"#E9F0FF"}
              shadowColor={nouns101Blue}
              mr={2}
            >
              <VStack alignItems={"start"}>
                <TinaMarkdown content={content} />
              </VStack>
            </ShadowedPixelBox>
            <Spacer h={2} />
          </Box>
        </>
      )}
    </>
  );
};

export const NutshellDefinitions = createContext<NutshellDefinitionsMap>({});

export type NutshellDefinitionsMap = {
  [permalink: string]: MDXRemoteSerializeResult;
};

export const normalizeName = (name: string) =>
  name.replace(/[ -]/g, "_").toLowerCase();

export const depluralizeName = (name: string) => name.replace(/[sS]$/g, "");
