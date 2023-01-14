import { useBreakpointValue } from "@chakra-ui/react";

export const useIsMobile = () =>
  // @ts-expect-error
  useBreakpointValue([true, false], { fallback: false });
