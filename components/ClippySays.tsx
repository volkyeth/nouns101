import { Box, BoxProps, StackProps, VStack } from "@chakra-ui/react";
import { FC } from "react";
import Clippy from "../public/lil-clippy.svg";
import Image from "next/image";
import { Shadow } from "./Shadow";

export type ClippySaysProps = {
  clippyScale: number;
} & StackProps;

export const ClippySays: FC<ClippySaysProps> = ({
  clippyScale = 1,
  children,
  ...props
}) => {
  return (
    <VStack width={"fit-content"} gap={2} alignItems={"end"} {...props}>
      <Shadow size={4}>
        <Box
          clipPath={speechBubblePath}
          color={"black"}
          bgColor={"white"}
          p="20px 20px 32px 20px"
        >
          {children}
        </Box>
      </Shadow>
      <Image
        alt={"Clippy"}
        src={Clippy}
        width={260 * clippyScale}
        style={{ transform: "scaleX(-1)" }}
      />
    </VStack>
  );
};
// @TODO use border-image instead https://css-tricks.com/almanac/properties/b/border-image/#bi-notes-on-svg
const speechBubblePath = `
    polygon(
    0px 16px,
    4px 16px,
    4px 8px,
    8px 8px,
    8px 4px,
    20px 4px,
    20px 0px,
    
    calc(100% - 20px) 0px,
    calc(100% - 20px) 4px,
    calc(100% - 8px) 4px,
    calc(100% - 8px) 8px,
    calc(100% - 4px) 8px,
    calc(100% - 4px) 16px,
    calc(100%) 16px,
    
    100% calc(100% - 32px),
    calc(100% - 4px) calc(100% - 32px),
    calc(100% - 4px) calc(100% - 24px),
    calc(100% - 8px) calc(100% - 24px),
    calc(100% - 8px) calc(100% - 20px),
    calc(100% - 12px) calc(100% - 20px),
    calc(100% - 12px) calc(100% - 16px),
    calc(100% - 16px) calc(100% - 16px),
    calc(100% - 16px) calc(100% - 12px),
    calc(100% - 20px) calc(100% - 12px),
    calc(100% - 20px) calc(100% - 8px),
    calc(100% - 24px) calc(100% - 8px),
    calc(100% - 24px) calc(100% - 4px),
    calc(100% - 28px) calc(100% - 4px),
    calc(100% - 28px) 100%,
    calc(100% - 32px) 100%,
    calc(100% - 32px) calc(100% - 8px),
    calc(100% - 28px) calc(100% - 8px),
    calc(100% - 28px) calc(100% - 16px),
    
    
    20px calc(100% - 16px),
    20px calc(100% - 20px),
    8px calc(100% - 20px),
    8px calc(100% - 24px),
    4px calc(100% - 24px),
    4px calc(100% - 32px),
    0px calc(100% - 32px)
  );`;
