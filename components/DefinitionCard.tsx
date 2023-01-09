import { Divider, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { CopyLinkButton } from "./CopyLinkButton";
import { join } from "lodash";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ShadowedPixelBox } from "./ShadowedPixelBox";
import thinArrow from "../assets/thinArrowRight.svg";
import { FC } from "react";
import Image from "next/image";
import { GlossaryQuery } from "../.tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Markdown } from "./Markdown";

export type DefinitionCardProps = {
  definition: GlossaryQuery["glossary"];
  permalink: string;
};

export const DefinitionCard: FC<DefinitionCardProps> = ({
  definition,
  permalink,
}) => {
  return (
    <ShadowedPixelBox w={"2xl"} p={10} fontFamily={`"LoRes 12 OT",sans-serif`}>
      <VStack alignItems={"start"} spacing={6}>
        <HStack justifyContent={"space-between"} w={"full"}>
          <Heading color={"nouns101.blue"}>
            {definition.title ?? permalink}
          </Heading>
          <CopyLinkButton link={`/glossary/${permalink}`} />
        </HStack>
        <VStack w={"full"} spacing={0} alignItems={"start"}>
          <Divider borderWidth={1} opacity={1} borderColor={"gray.700"} />
          {(definition.aliases?.length ?? 0) > 0 && (
            <Text fontWeight={"semibold"} color={"gray.700"}>{`AKA: ${join(
              definition.aliases,
              ", "
            )}`}</Text>
          )}
        </VStack>
        <VStack alignItems={"start"} w={"full"}>
          <Markdown content={definition.body} />
        </VStack>
        {/*{(Object.keys(definition.frontmatter?.externalReferences ?? {})*/}
        {/*  .length ?? 0) > 0 && (*/}
        {/*  <VStack>*/}
        {/*    {Object.entries(*/}
        {/*      definition.frontmatter?.externalReferences ?? {}*/}
        {/*    ).map(([label, href]) => (*/}
        {/*      <Link*/}
        {/*        isExternal*/}
        {/*        key={label}*/}
        {/*        href={href}*/}
        {/*        style={{ alignSelf: "start" }}*/}
        {/*      >*/}
        {/*        <HStack>*/}
        {/*          <Image src={thinArrow} alt={"arrow"} />*/}
        {/*          <Text color={"nouns101.blue"} fontWeight={"bold"}>*/}
        {/*            {label}*/}
        {/*          </Text>*/}
        {/*        </HStack>*/}
        {/*      </Link>*/}
        {/*    ))}*/}
        {/*  </VStack>*/}
        {/*)}*/}
      </VStack>
    </ShadowedPixelBox>
  );
};
