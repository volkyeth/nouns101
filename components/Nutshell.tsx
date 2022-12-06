import {
  ComponentType,
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import {
  Box,
  chakra,
  Link,
  Spacer,
  StackProps,
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
} & StackProps;

declare var twttr: { widgets: { load: () => void } };

export const Nutshell: FC<NutshellProps> = ({ children, term, ...props }) => {
  const { isOpen, onToggle } = useDisclosure();
  const nouns101Blue = useToken("colors", "nouns101.blue");

  useEffect(() => {
    if (!isOpen) return;
    // @TODO remove when static tweet embedding is implemented (#28)
    twttr.widgets.load();
  }, [isOpen]);

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
        {isOpen && <SmallArrowUp viewBox={"0 0 27 15"} color={"#E9F0FF"} />}
      </VStack>
      {isOpen && (
        <>
          <Box>
            <ShadowedPixelBox bgColor={"#E9F0FF"} shadowColor={nouns101Blue}>
              <VStack alignItems={"start"}>{children}</VStack>
            </ShadowedPixelBox>
            <Spacer h={2} />
          </Box>
        </>
      )}
    </>
  );
};
