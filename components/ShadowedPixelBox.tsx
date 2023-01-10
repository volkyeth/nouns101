import { FC } from "react";
import { Box, BoxProps, forwardRef } from "@chakra-ui/react";
import { pixelatedClipPath } from "../utils/clipPaths";
import { Shadow } from "./Shadow";
import { motion, MotionProps } from "framer-motion";

export type ShadowedPixelBoxProps = {
  shadowColor?: string;
} & MotionProps &
  PixelBoxProps;
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
} & MotionProps &
  BoxProps;

export const PixelBox: FC<PixelBoxProps> = ({ pixelSize = 4, ...props }) => (
  <Box
    as={motion.div}
    p={4}
    clipPath={pixelatedClipPath(pixelSize)}
    bgColor={"white"}
    {...props}
  />
);
