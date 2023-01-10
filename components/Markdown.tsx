import { FC, useEffect } from "react";
import { chakra, PropsOf, VStack } from "@chakra-ui/react";
import { Nutshell } from "./Nutshell";
import { TinaMarkdown } from "tinacms/dist/rich-text";
// @ts-ignore
import { YouTube } from "mdx-embed/dist/components/youtube";
import { BrowserPic } from "./BrowserPic";
import { Team } from "./Team";

export const Markdown: FC<Pick<PropsOf<typeof TinaMarkdown>, "content">> = ({
  content,
}) => {
  const components = {
    Nutshell,
    YouTube,
    BrowserPic,
    p: chakra.div,
    Html: ({ html }: { html: string }) => (
      <chakra.div w={"full"} dangerouslySetInnerHTML={{ __html: html }} />
    ),
    a: (props: any) => (
      <chakra.a target={"_blank"} {...props} href={props.url} />
    ),
    h1: (props: any) => (
      <chakra.h1
        fontSize={32}
        fontWeight={"bold"}
        fontFamily={`"LoRes 9 OT", sans-serif`}
        {...props}
      />
    ),
    h2: (props: any) => (
      <chakra.h2
        fontSize={28}
        fontWeight={"bold"}
        fontFamily={`"LoRes 12 OT", sans-serif`}
        color={"nouns101.blue"}
        {...props}
      />
    ),
    Team,
  };
  useEffect(() => {
    // @ts-ignore
    typeof twttr !== "undefined" && twttr.widgets.load();
  }, [content]);

  return (
    <VStack
      className={"markdown-content"}
      alignItems={"start"}
      spacing={6}
      w={"full"}
    >
      <TinaMarkdown
        content={content}
        // @ts-ignore
        components={components}
      />
    </VStack>
  );
};
