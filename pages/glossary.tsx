import { FC, useEffect, useLayoutEffect, useState } from "react";
import {
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { MainLayout } from "../components/MainLayout";
import Link from "next/link";
import { ShadowedPixelBox } from "../components/ShadowedPixelBox";
import { Nutshell } from "../components/Nutshell";
import openImg from "../assets/open.svg";
import Image from "next/image";
import { PixelTooltip } from "../components/PixelTooltip";
import { CopyLinkButton } from "../components/CopyLinkButton";
import client from "../.tina/__generated__/client";
import { Glossary } from "../.tina/__generated__/types";
import { basename } from "path";
import { useDebounce } from "../utils/debounce";

export const getStaticProps: GetStaticProps<GlossaryProps> = async () => {
  const glossaryEntries = await client.queries
    .glossaryConnection({
      first: 100000,
      filter: { hide: { eq: false } },
      sort: "title",
    })!
    .then((res) =>
      res!.data!.glossaryConnection!.edges!.map(
        (edge) => edge!.node as Glossary
      )
    );

  return {
    props: {
      glossaryEntries,
    },
  };
};

type GlossaryProps = {
  glossaryEntries: Glossary[];
};

const Glossary: FC<GlossaryProps> = ({ glossaryEntries }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGlossaryEntries, setFilteredGlossaryEntries] =
    useState(glossaryEntries);
  const { changed, debouncedState: debouncedSearchTerm } = useDebounce(
    searchTerm,
    500
  );

  useLayoutEffect(() => {
    if (!debouncedSearchTerm) {
      setFilteredGlossaryEntries(glossaryEntries);
      return;
    }

    setFilteredGlossaryEntries(
      glossaryEntries.filter((entry) =>
        [entry.title, ...(entry.aliases ?? [])]
          .filter((t): t is string => typeof t === "string")
          .map((t) => t.toLowerCase())
          .some((t) => t.includes(debouncedSearchTerm.toLowerCase()))
      )
    );
  }, [debouncedSearchTerm]);

  return (
    <MainLayout centerContent>
      <VStack spacing={10} w={"full"}>
        <Heading
          fontFamily={`"LoRes 12 OT",sans-serif`}
          color={"nouns101.blue"}
        >
          Glossary
        </Heading>

        <ShadowedPixelBox w={["full", "xl"]} py={1} px={2}>
          <InputGroup>
            <Input
              placeholder="search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fontFamily={`"LoRes 9 OT",sans-serif`}
              fontSize={"md"}
              _placeholder={{ color: "gray.300" }}
              borderRadius={0}
            />
            <InputRightElement pointerEvents="none" color="nouns101.blue">
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
              >
                <path
                  d="M6 2h8v2H6V2zM4 6V4h2v2H4zm0 8H2V6h2v8zm2 2H4v-2h2v2zm8 0v2H6v-2h8zm2-2h-2v2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm0-8h2v8h-2V6zm0 0V4h-2v2h2z"
                  fill="currentColor"
                />
              </svg>
            </InputRightElement>
          </InputGroup>
        </ShadowedPixelBox>

        <ShadowedPixelBox w={["full", "2xl"]}>
          <VStack
            p={[4, 10]}
            fontFamily={`"LoRes 12 OT",sans-serif`}
            fontSize={["md", "lg"]}
            spacing={2}
            filter={changed ? "opacity(0.3)" : undefined}
          >
            {filteredGlossaryEntries.map(({ title, body, id }) => {
              const permalink = basename(id, ".mdx");
              return (
                <VStack
                  key={title}
                  spacing={-1}
                  alignItems={"start"}
                  w={"full"}
                >
                  <Nutshell body={body}>{title}</Nutshell>
                  <HStack position={"absolute"} right={0} pr={10}>
                    <PixelTooltip label={"Open definition page"}>
                      <Link key={title} href={`/glossary/${permalink}`}>
                        <Image src={openImg} alt={"open definition"} />
                      </Link>
                    </PixelTooltip>
                    <CopyLinkButton link={`/glossary/${permalink}`} />
                  </HStack>
                </VStack>
              );
            })}
            {filteredGlossaryEntries.length === 0 && (
              <Text>
                No matches for <b>{debouncedSearchTerm}</b>
              </Text>
            )}
          </VStack>
        </ShadowedPixelBox>
      </VStack>
    </MainLayout>
  );
};

export default Glossary;
