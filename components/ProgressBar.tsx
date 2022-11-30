import { FC } from "react";
import { Box, HStack, StackProps } from "@chakra-ui/react";

export type ProgressBarProps = {
  amountSegments: number;
  currentSegment: number;
} & StackProps;

export const ProgressBar: FC<ProgressBarProps> = ({
  amountSegments,
  currentSegment,
  ...props
}) => (
  <HStack h={2} {...props}>
    {Array(amountSegments)
      .fill(null)
      .map((_, idx) => (
        <Box
          key={`progress-chunk-${idx}`}
          flexGrow={1}
          h={"full"}
          bgColor={idx + 1 <= currentSegment ? "#8DD122" : "white"}
        />
      ))}
  </HStack>
);
