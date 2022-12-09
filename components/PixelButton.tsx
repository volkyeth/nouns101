import {
  Button,
  ButtonProps,
  Center,
  forwardRef,
  SimpleGrid,
} from "@chakra-ui/react";
import { FC } from "react";
import { pixelatedClipPath } from "../utils/clipPaths";
import { PixelBox } from "./ShadowedPixelBox";

export type PixelButtonProps = {
  pixelSize?: number;
  shadowColor?: string;
  hasShadow?: boolean;
} & ButtonProps;

export const PixelButton = forwardRef<PixelButtonProps, "button">(
  (
    {
      pixelSize = 2,
      shadowColor = "black",
      hasShadow = true,
      alignSelf,
      children,
      ...props
    },
    ref
  ) => (
    <SimpleGrid alignSelf={alignSelf}>
      {hasShadow && (
        <PixelBox
          w={"full"}
          h={"full"}
          p={0}
          gridArea={"1/1/1/1"}
          bgColor={"black"}
          pixelSize={pixelSize}
          transform={`translate(${pixelSize * 2}px, ${pixelSize * 2}px)`}
        />
      )}

      <Button
        variant={"unstyled"}
        gridArea={"1/1/1/1"}
        ref={ref}
        color={"#2245C5"}
        fontFamily={`"Lores 12 OT", sans-serif;`}
        clipPath={pixelatedClipPath(pixelSize)}
        bgColor={"white"}
        h={7}
        w={"fit-content"}
        minW={20}
        _hover={{
          transform: `translate(1px, 1px)`,
        }}
        _active={{
          transform: `translate(${pixelSize * 2}px, ${pixelSize * 2}px)`,
        }}
        {...props}
      >
        <Center>{children}</Center>
      </Button>
    </SimpleGrid>
  )
);

export type CtaButtonProps = {
  colorScheme?: "blue" | "white";
} & PixelButtonProps;

export const CtaButton: FC<CtaButtonProps> = ({
  colorScheme = "white",
  ...props
}) => (
  <PixelButton
    color={colorScheme === "blue" ? "white" : undefined}
    bgColor={colorScheme === "blue" ? "#254EFB" : undefined}
    {...props}
  />
);
