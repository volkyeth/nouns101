import { chakra, forwardRef, Tooltip, TooltipProps } from "@chakra-ui/react";

export const PixelTooltip = forwardRef<TooltipProps, "div">(
  ({ children, ...props }, ref) => (
    <Tooltip
      className={"pixel-tooltip"}
      fontFamily={`"LoRes 12 OT",sans-serif`}
      hasArrow
      color={"white"}
      bgColor={"nouns101.blue"}
      borderWidth={1}
      borderColor={"black"}
      borderRadius={0}
      boxShadow={"4px 4px black"}
      ref={ref}
      {...props}
    >
      <chakra.u>{children}</chakra.u>
    </Tooltip>
  )
);
