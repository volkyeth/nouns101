import { FC, ReactNode } from "react";
import {
  Box,
  Link,
  Spacer,
  StackProps,
  useDisclosure,
  useToken,
  VStack,
} from "@chakra-ui/react";
import { ShadowedPixelBox } from "./ShadowedPixelBox";
import { SmallArrowUp } from "./Icons";

export type NutshellProps = {
  children: ReactNode;
  term: string;
  isOpen?: boolean;
} & StackProps;

export const Nutshell: FC<NutshellProps> = ({
  children,
  term,
  isOpen: forceOpen,
  ...props
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const nouns101Blue = useToken("colors", "nouns101.blue");
  const expanded = forceOpen ?? isOpen;

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
              <VStack alignItems={"start"}>{children}</VStack>
            </ShadowedPixelBox>
            <Spacer h={2} />
          </Box>
        </>
      )}
    </>
  );
};
