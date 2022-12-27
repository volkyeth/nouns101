import { FC, PropsWithChildren, ReactNode } from "react";
import {
  Box,
  chakra,
  HeadingProps,
  Image,
  PropsOf,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { Nutshell } from "./Nutshell";
import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";
import { PixelTooltip } from "./PixelTooltip";
import { TinaMarkdown } from "tinacms/dist/rich-text";

// @ts-ignore
import { Tweet } from "mdx-embed/dist/components/twitter";
// @ts-ignore
import { YouTube } from "mdx-embed/dist/components/youtube";

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
    ul: Ul,
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
    return <Nutshell />;
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

const Ul: FC<PropsOf<"ul">> = ({ children }) => {
  return (
    <UnorderedList listStylePosition={"inside"} listStyleType={"square"}>
      {children}
    </UnorderedList>
  );
};

export const Markdown: FC<Pick<PropsOf<typeof TinaMarkdown>, "content">> = ({
  content,
}) => {
  const components = { Nutshell, Tweet, YouTube };
  return (
    <VStack className={"markdown-content"} alignItems={"start"} spacing={6}>
      <TinaMarkdown content={content} components={components} />
    </VStack>
  );
};
