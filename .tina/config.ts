import { Collection, defineConfig, Template } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "preview";

const chapterCollection = (number: number): Collection => ({
  name: `chapter${number}`,
  label: `Chapter ${number}`,
  path: `content/chapters/${number}/sections`,
  format: "mdx",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
      isTitle: true,
      required: true,
    },
    {
      name: "body",
      label: "Body",
      type: "rich-text",
      required: true,
      isBody: true,
      templates: [{ ...nutshell, inline: true }],
    },
  ],
});

const nutshell: Template = {
  name: "Nutshell",
  label: "Nutshell",
  fields: [
    {
      type: "reference",
      name: "glossaryEntry",
      label: "Glossary entry",
      description: "Select a glossary entry",
      collections: ["glossary"],
      required: false,
    },
    {
      type: "rich-text",
      name: "body",
      label: "Content",
      description:
        "If you want to add a custom nutshell, enter it's content here and leave the Glossary entry field empty.",
      required: false,
    },
    {
      type: "string",
      name: "children",
      label: "Text",
      description: "this is the collapsed nutshell text",
      required: true,
    },
  ],
};

export default defineConfig({
  branch,
  clientId: "27afce68-cf9b-4f9f-a296-8bc2e283a74e", // Get this from tina.io
  token: "12aa17c49b4a2b2d9193919826ac366fd926477d", // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      chapterCollection(1),
      chapterCollection(2),
      chapterCollection(3),
      chapterCollection(4),
      {
        name: "glossary",
        label: "Glossary",
        path: "content/glossary",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [{ ...nutshell, inline: true }],
          },
          {
            name: "aliases",
            label: "Aliases",
            type: "string",
            list: true,
          },
          {
            name: "seeAlso",
            label: "Related",
            type: "string",
            list: true,
          },
        ],
        ui: {
          router: ({ document }) => `/glossary/${document._sys.filename}`,
        },
      },
    ],
  },
});
