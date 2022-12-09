import { chakra, forwardRef, Tooltip, TooltipProps } from "@chakra-ui/react";

export const PixelTooltip = forwardRef<TooltipProps, "div">(
  ({ children, ...props }, ref) => (
    <Tooltip
      fontFamily={`"LoRes 12 OT",sans-serif`}
      hasArrow
      color={"white"}
      bgColor={"nouns101.blue"}
      ref={ref}
      {...props}
    >
      <chakra.u>{children}</chakra.u>
    </Tooltip>
  )
);
