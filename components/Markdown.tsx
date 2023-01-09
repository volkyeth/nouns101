import { FC, PropsWithChildren, ReactNode, useEffect } from "react";
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
import { YouTube } from "mdx-embed/dist/components/youtube";
import { BrowserPic } from "./BrowserPic";

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
  };
  useEffect(() => {
    // @ts-ignore
    typeof twttr !== "undefined" && twttr.widgets.load();
  }, [content]);

  return (
    <VStack className={"markdown-content"} alignItems={"start"} spacing={6}>
      <TinaMarkdown
        content={content}
        // @ts-ignore
        components={components}
      />
    </VStack>
  );
};
