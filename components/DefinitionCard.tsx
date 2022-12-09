import { Divider, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { CopyLinkButton } from "./CopyLinkButton";
import { join } from "lodash";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ShadowedPixelBox } from "./ShadowedPixelBox";
import { FC } from "react";

export type DefinitionCardProps = {
  definition: MDXRemoteSerializeResult;
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
            {definition.frontmatter?.title ?? permalink}
          </Heading>
          <CopyLinkButton link={`/glossary/${permalink}`} />
        </HStack>
        <VStack w={"full"} spacing={0} alignItems={"start"}>
          <Divider borderWidth={1} opacity={1} borderColor={"gray.700"} />
          {(definition.frontmatter?.aliases?.length ?? 0) > 0 && (
            <Text fontWeight={"semibold"} color={"gray.700"}>{`AKA: ${join(
              definition.frontmatter!.aliases,
              ", "
            )}`}</Text>
          )}
        </VStack>
        <VStack alignItems={"start"} w={"full"}>
          <MDXRemote {...definition} />
        </VStack>
      </VStack>
    </ShadowedPixelBox>
  );
};
