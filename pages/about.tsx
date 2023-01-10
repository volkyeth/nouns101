import type { GetStaticProps, NextPage } from "next";
import { MainLayout } from "../components/MainLayout";
import client from "../.tina/__generated__/client";
import { DefinitionCard } from "../components/DefinitionCard";
import { useTina } from "tinacms/dist/react";
import { Center } from "@chakra-ui/react";

type AboutProps = {
  aboutNouns101: Awaited<ReturnType<typeof client.queries.glossary>>;
};

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  const aboutNouns101 = await client.queries.glossary({
    relativePath: "Nouns101.mdx",
  });

  aboutNouns101.data.glossary.title = "About Nouns 101";

  return {
    props: {
      aboutNouns101,
    },
  };
};

const About: NextPage<AboutProps> = ({ aboutNouns101 }) => {
  const {
    data: { glossary: aboutProject },
  } = useTina(aboutNouns101);
  return (
    <MainLayout>
      <Center>
        <DefinitionCard
          definition={aboutProject}
          permalink={""}
          hasLink={false}
        />
      </Center>
    </MainLayout>
  );
};

export default About;
