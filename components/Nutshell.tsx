import { FC, ReactNode } from "react";
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
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import client from "../.tina/__generated__/client";
import { basename } from "path";
import { useQuery } from "react-query";
import { Markdown } from "./Markdown";

export type NutshellProps = {
  glossaryEntry?: string;
  body?: TinaMarkdownContent;
  startOpen?: boolean;
  children?: ReactNode;
} & StackProps;

export const Nutshell: FC<NutshellProps> = ({
  glossaryEntry,
  body,
  children,
  startOpen = false,
  ...props
}) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: startOpen });
  const nouns101Blue = useToken("colors", "nouns101.blue");
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
        {isOpen && <SmallArrowUp viewBox={"0 0 27 15"} color={"#E9F0FF"} />}
      </VStack>
      {isOpen && (
        <>
          <Box>
            <ShadowedPixelBox
              bgColor={"#E9F0FF"}
              shadowColor={nouns101Blue}
              mr={2}
            >
              <VStack alignItems={"start"}>
                <Markdown content={content} />
              </VStack>
            </ShadowedPixelBox>
            <Spacer h={2} />
          </Box>
        </>
      )}
    </>
  );
};
