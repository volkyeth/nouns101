import { useBreakpointValue } from "@chakra-ui/react";

export const useIsMobile = () =>
  useBreakpointValue([true, false]);
