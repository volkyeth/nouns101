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
import { Tweet, TwitterContextProvider } from "react-static-tweets";

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
    Tweet,
    StaticTweet,
  };

  return (
    <TwitterContextProvider
      value={{
        tweetAstMap: {
          1599842970374545410: [
            {
              tag: "div",
              data: {
                id: "1599842970374545410",
                avatar: {
                  normal:
                    "https://pbs.twimg.com/profile_images/1599757240197677056/sv4bZ7nf_normal.jpg",
                },
                name: "volky.⌐◨-◨",
                username: "volkyeth",
                createdAt: 1670267262000,
                heartCount: "",
                ctaType: "profile",
                type: "tweet",
              },
              nodes: [
                {
                  tag: "p",
                  nodes: [
                    "Noundry studio source code now available:https://github.com/volkyeth/noundry-studio",
                    {
                      tag: "br",
                    },
                    {
                      tag: "br",
                    },
                    "CC0 all the way, use as you wish",
                    {
                      tag: "br",
                    },
                    {
                      tag: "br",
                    },
                    "Reports, requests, contributions are appreciated ",
                    {
                      tag: "img",
                      props: {
                        dataType: "emoji-for-text",
                        src: "https://abs.twimg.com/emoji/v2/72x72/270c.png",
                        alt: "✌",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      }}
    >
      <MDXProvider components={components}>{children}</MDXProvider>
    </TwitterContextProvider>
  );
};

export const NutshellDefinitions = createContext({});

export type NutshellDefinitions = {
  [permalink: string]: MDXRemoteSerializeResult;
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
  const nutshellDefinitions =
    useContext<NutshellDefinitions>(NutshellDefinitions);

  if (className && className.includes("wikilink")) {
    if (nutshellDefinitions && nutshellDefinitions[href!]) {
      return (
        <Nutshell term={children as string}>
          <MDXRemote {...nutshellDefinitions[href!]} />
        </Nutshell>
      );
    }

    return (
      <Text color={"red"} fontWeight={"extrabold"} display={"inline"}>
        :{children}:
      </Text>
    );
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

type StaticTweetProps = {
  id: string;
  ast: any;
};

const StaticTweet: FC<StaticTweetProps> = ({ id, ast }) => {
  // Use the tweets map that is present in the outer scope to get the content associated with the id passed as prop
  // console.log(ast);
  // return <Text>{id}</Text>;
  return <Tweet id={id} ast={ast} />;
};
