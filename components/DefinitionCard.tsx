import { Divider, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { CopyLinkButton } from "./CopyLinkButton";
import { join } from "lodash";
import { ShadowedPixelBox, ShadowedPixelBoxProps } from "./ShadowedPixelBox";
import { FC } from "react";
import { GlossaryQuery } from "../.tina/__generated__/types";
import { Markdown } from "./Markdown";

export type DefinitionCardProps = {
  definition: GlossaryQuery["glossary"];
  hasLink?: boolean;
  permalink: string;
} & ShadowedPixelBoxProps;

export const DefinitionCard: FC<DefinitionCardProps> = ({
  definition,
  permalink,
  hasLink = true,
  ...props
}) => {
  return (
    <ShadowedPixelBox
      w={"2xl"}
      maxW={"2xl"}
      p={10}
      fontFamily={`"LoRes 12 OT",sans-serif`}
      {...props}
    >
      <VStack alignItems={"start"} spacing={6}>
        <HStack justifyContent={"space-between"} w={"full"}>
          <Heading color={"nouns101.blue"}>
            {definition.title ?? permalink}
          </Heading>
          {hasLink && <CopyLinkButton link={`/glossary/${permalink}`} />}
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
      </VStack>
    </ShadowedPixelBox>
  );
};
