import { Button, ButtonProps, chakra, forwardRef } from "@chakra-ui/react";
import { FC, ForwardedRef } from "react";
import { pixelatedClipPath } from "../utils/clipPaths";
import { Shadow } from "./Shadow";

export type PixelButtonProps = {
  pixelSize?: number;
  shadowColor?: string;
} & ButtonProps;

export const PixelButton = forwardRef<PixelButtonProps, "button">(
  ({ pixelSize = 4, shadowColor = "black", alignSelf, ...props }, ref) => (
    <Shadow size={pixelSize} alignSelf={alignSelf} color={shadowColor}>
      <Button
        ref={ref}
        color={"#2245C5"}
        fontFamily={`"Lores 12 OT", sans-serif;`}
        clipPath={pixelatedClipPath(pixelSize)}
        bgColor={"white"}
        h={8}
        {...props}
      />
    </Shadow>
  )
);
