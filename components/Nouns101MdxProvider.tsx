import {
  createContext,
  FC,
  PropsWithChildren,
  ReactNode,
  useContext,
} from "react";
import { chakra, HeadingProps, Image, Text } from "@chakra-ui/react";
import { Nutshell } from "./Nutshell";
import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { PixelTooltip } from "./PixelTooltip";

export const Nouns101MdxProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const components = {
    img: Image,
    h1: H1,
    h2: H2,
    p: chakra.div,
    pre: chakra.pre,
    code: chakra.code,
    a: CustomLink,
    Nutshell,
    Tooltip: PixelTooltip,
    Link,
  };

  return <MDXProvider components={components}>{children}</MDXProvider>;
};

type CustomLinkProps = {
  href?: string;
  children?: ReactNode;
  className?: string;
};

const ResponsiveImage = (props: any) => (
  <Image layout="responsive" loading="lazy" {...props} />
);

const CustomLink: FC<CustomLinkProps> = ({ href, children, className }) => {
  if (className && className.includes("wikilink")) {
    return <Nutshell term={children as string} />;
  }

  return (
    <chakra.u color={"nouns101.blue"}>
      <Link href={href!}>{children}</Link>
    </chakra.u>
  );
};

const H1: FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <chakra.h1 fontSize={"2xl"} fontWeight={"bold"} {...props}>
      {children}
    </chakra.h1>
  );
};

const H2: FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <chakra.h2 fontSize={"lg"} fontWeight={"bold"} {...props}>
      {children}
    </chakra.h2>
  );
};
