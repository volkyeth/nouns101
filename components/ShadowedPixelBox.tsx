import { FC } from "react";
import { Box, BoxProps, chakra, forwardRef } from "@chakra-ui/react";
import { pixelatedClipPath } from "../utils/clipPaths";
import { Shadow } from "./Shadow";

export type ShadowedPixelBoxProps = {
  shadowColor?: string;
} & PixelBoxProps;
export const ShadowedPixelBox: FC<ShadowedPixelBoxProps> = forwardRef(
  (
    { pixelSize = 4, shadowColor = "black", w, gridArea, transform, ...props },
    ref
  ) => (
    <Shadow
      w={w}
      size={pixelSize}
      color={shadowColor}
      gridArea={gridArea}
      transform={transform}
    >
      <PixelBox {...props} />
    </Shadow>
  )
);

export type OutlinedPixelBoxProps = {
  outlineColor?: string;
} & PixelBoxProps;

export const OutlinedPixelBox: FC<OutlinedPixelBoxProps> = forwardRef(
  ({ pixelSize = 4, outlineColor = "black", ...props }, ref) => (
    <Box
      p={`${pixelSize}px`}
      clipPath={pixelatedClipPath(pixelSize)}
      bgColor={outlineColor}
    >
      <PixelBox {...props} />
    </Box>
  )
);

export type PixelBoxProps = {
  pixelSize?: number;
} & BoxProps;

export const PixelBox: FC<PixelBoxProps> = ({ pixelSize = 4, ...props }) => (
  <Box
    p={4}
    clipPath={pixelatedClipPath(pixelSize)}
    bgColor={"white"}
    {...props}
  />
);
