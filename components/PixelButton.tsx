import {
  Button,
  ButtonProps,
  Center,
  chakra,
  forwardRef,
  SimpleGrid,
} from "@chakra-ui/react";
import { FC, ForwardedRef } from "react";
import { pixelatedClipPath } from "../utils/clipPaths";
import { Shadow } from "./Shadow";
import { PixelBox } from "./ShadowedPixelBox";
import { ConditionalWrapper } from "./ConditionalWrapper";

export type PixelButtonProps = {
  pixelSize?: number;
  shadowColor?: string;
  outlineColor?: string;
  outlineSize?: number;
  hasShadow?: boolean;
  hasOutline?: boolean;
} & ButtonProps;

export const PixelButton = forwardRef<PixelButtonProps, "button">(
  (
    {
      pixelSize = 2,
      shadowColor = "black",
      outlineColor = "black",
      hasShadow = true,
      hasOutline = false,
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
      <ConditionalWrapper
        wrap={hasOutline}
        wrapper={(children) => (
          <PixelBox
            p={`${pixelSize}px`}
            gridArea={"1/1/1/1"}
            bgColor={"black"}
            pixelSize={pixelSize}
            _hover={{
              transform: `translate(1px, 1px)`,
            }}
            _active={{
              transform: `translate(${pixelSize * 2}px, ${pixelSize * 2}px)`,
            }}
          >
            {children}
          </PixelBox>
        )}
      >
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
          _hover={
            !hasOutline
              ? {
                  transform: `translate(1px, 1px)`,
                }
              : undefined
          }
          _active={
            !hasOutline
              ? {
                  transform: `translate(${pixelSize * 2}px, ${
                    pixelSize * 2
                  }px)`,
                }
              : undefined
          }
          {...props}
        >
          <Center>{children}</Center>
        </Button>
      </ConditionalWrapper>
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
    hasOutline
    color={colorScheme === "blue" ? "white" : undefined}
    bgColor={colorScheme === "blue" ? "#254EFB" : undefined}
    {...props}
  />
);
