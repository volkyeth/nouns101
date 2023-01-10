import { FC } from "react";
import { chakra, PropsOf, useToken } from "@chakra-ui/react";

export type ShadowProps = {
  size?: number;
  color?: string;
} & PropsOf<typeof chakra.span>;

export const Shadow: FC<ShadowProps> = ({
  children,
  size = 3,
  color = "black",
  ...props
}) => {
  const shadowColor = useToken("colors", color, color);
  return (
    <chakra.span
      filter={`drop-shadow(${size}px ${size}px ${shadowColor})`}
      {...props}
    >
      {children}
    </chakra.span>
  );
};
