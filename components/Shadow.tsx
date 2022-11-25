import { FC, PropsWithChildren } from "react";
import { chakra, PropsOf } from "@chakra-ui/react";

export type ShadowProps = {
  size?: number;
  color?: string;
} & PropsOf<typeof chakra.span>;

export const Shadow: FC<ShadowProps> = ({
  children,
  size = 3,
  color = "black",
  ...props
}) => (
  <chakra.span filter={`drop-shadow(${size}px ${size}px ${color})`} {...props}>
    {children}
  </chakra.span>
);
