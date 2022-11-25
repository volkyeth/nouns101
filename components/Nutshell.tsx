import {
  ComponentType,
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useContext,
} from "react";
import { useRouter } from "next/router";
import {
  Box,
  chakra,
  Link,
  Spacer,
  Text,
  useDisclosure,
  useTheme,
  useToken,
  VStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import {
  OutlinedPixelBox,
  OutlinedPixelBoxProps,
  ShadowedPixelBox,
} from "./ShadowedPixelBox";
import { SmallArrowUp } from "./Icons";

export type NutshellProps = {
  children: ReactNode;
  term: string;
};

export const Nutshell: FC<NutshellProps> = ({ children, term }) => {
  const { isOpen, onToggle } = useDisclosure();
  const nouns101Blue = useToken("colors", "nouns101.blue");

  return (
    <>
      <VStack
        display={"inline-flex"}
        spacing={-2}
        verticalAlign={"top"}
        textAlign={"center"}
      >
        <Link
          variant={"unstyled"}
          color={nouns101Blue}
          fontWeight={"extrabold"}
          onClick={onToggle}
        >
          :{term}:
        </Link>
        {isOpen && <SmallArrowUp viewBox={"0 0 27 15"} color={"#E9F0FF"} />}
      </VStack>
      {isOpen && (
        <>
          <ShadowedPixelBox bgColor={"#E9F0FF"} shadowColor={nouns101Blue}>
            <VStack alignItems={"start"}>{children}</VStack>
          </ShadowedPixelBox>
          <Spacer h={2} />
        </>
      )}
    </>
  );
};
