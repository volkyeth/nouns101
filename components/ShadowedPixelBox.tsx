import { FC } from "react";
import { Box, BoxProps, chakra, forwardRef } from "@chakra-ui/react";
import { pixelatedClipPath } from "../utils/clipPaths";
import { Shadow } from "./Shadow";

export type ShadowedPixelBoxProps = {
  pixelSize?: number;
  shadowColor?: string;
} & BoxProps;

export const ShadowedPixelBox: FC<ShadowedPixelBoxProps> = forwardRef(
  (
    { pixelSize = 4, shadowColor = "black", gridArea, transform, ...props },
    ref
  ) => (
    <Shadow
      size={pixelSize}
      color={shadowColor}
      gridArea={gridArea}
      transform={transform}
    >
      <Box
        ref={ref}
        p={4}
        clipPath={pixelatedClipPath(pixelSize)}
        bgColor={"white"}
        {...props}
      />
    </Shadow>
  )
);

export type OutlinedPixelBoxProps = {
  pixelSize?: number;
  outlineColor?: string;
} & BoxProps;

export const OutlinedPixelBox: FC<OutlinedPixelBoxProps> = forwardRef(
  ({ pixelSize = 4, outlineColor = "black", ...props }, ref) => (
    <Box
      p={`${pixelSize}px`}
      clipPath={pixelatedClipPath(pixelSize)}
      bgColor={outlineColor}
    >
      <Box
        ref={ref}
        p={4}
        clipPath={pixelatedClipPath(pixelSize)}
        bgColor={"white"}
        {...props}
      />
    </Box>
  )
);
