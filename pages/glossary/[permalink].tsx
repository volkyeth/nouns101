import { FC } from "react";
import { Center } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { MainLayout } from "../../components/MainLayout";
import { DefinitionCard } from "../../components/DefinitionCard";
import { useTina } from "tinacms/dist/react";
import client from "../../.tina/__generated__/client";

export const getStaticProps: GetStaticProps<
  GlossaryEntryProps,
  { permalink: string }
> = async (context) => {
  const { permalink } = context.params!;
  const content = await client.queries.glossary({
    relativePath: `${permalink}.mdx`,
  });

  return {
    props: {
      permalink,
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postListResponse = await client.queries.glossaryConnection({
    first: 100000,
    filter: { hide: { eq: false } },
  });
  return {
    // @ts-ignore
    paths: postListResponse.data.glossaryConnection.edges.map((page) => ({
      params: { permalink: page!.node!._sys.filename },
    })),
    fallback: "blocking",
  };
};

type GlossaryEntryProps = {
  permalink: string;
  content: Awaited<ReturnType<typeof client.queries.glossary>>;
};

const GlossaryEntry: FC<GlossaryEntryProps> = ({ permalink, content }) => {
  const {
    data: { glossary: definition },
  } = useTina(content);
  return (
    <MainLayout>
      <Center>
        <DefinitionCard definition={definition} permalink={permalink} />
      </Center>
    </MainLayout>
  );
};

export default GlossaryEntry;
