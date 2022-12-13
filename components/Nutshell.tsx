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

export type NutshellProps = {
  term: string;
  isOpen?: boolean;
} & StackProps;

export const Nutshell: FC<NutshellProps> = ({
  term,
  isOpen: forceOpen,
  ...props
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const nouns101Blue = useToken("colors", "nouns101.blue");
  const expanded = forceOpen ?? isOpen;

  const definitions = useContext(NutshellDefinitions);
  const permalink = normalizeName(term);
  const definition =
    definitions[permalink] ?? definitions[depluralizeName(permalink)];

  if (!definition) {
    return (
      <Text color={"red"} fontWeight={"extrabold"} display={"inline"}>
        :{term}:
      </Text>
    );
  }

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
          :{term}:
        </Link>
        {expanded && <SmallArrowUp viewBox={"0 0 27 15"} color={"#E9F0FF"} />}
      </VStack>
      {expanded && (
        <>
          <Box>
            <ShadowedPixelBox bgColor={"#E9F0FF"} shadowColor={nouns101Blue}>
              <VStack alignItems={"start"}>
                <MDXRemote {...definition} />
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
