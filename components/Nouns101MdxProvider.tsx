import {
  ComponentType,
  createContext,
  FC,
  PropsWithChildren,
  ReactNode,
  useContext,
} from "react";
import {
  chakra,
  forwardRef, Image,
  Text,
  Tooltip,
  TooltipProps
} from "@chakra-ui/react";
import { Nutshell } from "./Nutshell";
import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

export const Nouns101MdxProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const components = {
    img: Image,
    h1: chakra.h1,
    h2: chakra.h2,
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

export const NutshellDefinitions = createContext({});

export type NutshellDefinitions = { [permalink: string]: MDXRemoteSerializeResult };

type CustomLinkProps = {
  href?: string;
  children?: ReactNode;
  className?: string;
};

const PixelTooltip = forwardRef<TooltipProps, "div">(
  ({ children, ...props }, ref) => (
    <Tooltip
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

const ResponsiveImage = (props: any) => (
  <Image layout="responsive" loading="lazy" {...props} />
);

const CustomLink: FC<CustomLinkProps> = ({ href, children, className }) => {
  const nutshellDefinitions =
    useContext<NutshellDefinitions>(NutshellDefinitions);

  if (className === "wikilink inexistent") {
    return (
      <Text color={"red"} fontWeight={"extrabold"} display={"inline"}>
        :{children}:
      </Text>
    );
  }

  if (className === "wikilink" && nutshellDefinitions && nutshellDefinitions[href!]) {
      return (
        <Nutshell term={children as string}><MDXRemote {...nutshellDefinitions[href!]}/></Nutshell>
      );
  }

  return (
    <chakra.u color={"nouns101.blue"}>
      <Link href={href!}>{children}</Link>
    </chakra.u>
  );
};
