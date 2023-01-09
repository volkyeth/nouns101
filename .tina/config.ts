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
      templates,
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
      type: "string",
      name: "children",
      label: "Text",
      description: "this is the collapsed nutshell text",
      required: true,
      isTitle: true,
    },
    {
      type: "boolean",
      name: "startOpen",
      label: "Start open",
      description: "Makes the nutshell start expanded",
    },
  ],
};

const YouTube: Template = {
  name: "YouTube",
  label: "YouTube",
  fields: [
    {
      name: "youTubeId",
      label: "YouTube video ID",
      type: "string",
      required: true,
      isTitle: true,
      description:
        "Enter the ID of the YouTube video. Example: If the full link is https://www.youtube.com/watch?v=Q8TXgCzxEnw, use Q8TXgCzxEnw as the ID",
    },
    {
      name: "aspectRatio",
      label: "Aspect Ratio",
      type: "string",
      options: ["16:9", "1:1", "4:3", "3:2", "8:5"],
    },
    {
      name: "skipTo",
      label: "Skip to",
      type: "object",
      fields: [
        { type: "number", label: "Hours", name: "h" },
        {
          type: "number",
          label: "Minutes",
          name: "m",
          required: true,
        },
        { type: "number", label: "Seconds", name: "s", required: true },
      ],
      description: "Start the video at specific time",
    },
  ],
};

const BrowserPic: Template = {
  name: "BrowserPic",
  label: "BrowserPic",
  fields: [
    {
      name: "image",
      label: "Image",
      type: "image",
      required: true,
    },
    {
      name: "alt",
      label: "Alternative text",
      type: "string",
    },
    {
      name: "description",
      label: "Description",
      type: "string",
    },
  ],
};

const Html: Template = {
  name: "Html",
  label: "HTML",
  fields: [
    {
      name: "html",
      label: "html",
      type: "string",
      required: true,
      ui: {
        component: "textarea",
      },
    },
  ],
};

const templates = [{ ...nutshell, inline: true }, YouTube, BrowserPic, Html];

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID!, // Get this from tina.io
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
            templates,
          },
          {
            type: "boolean",
            name: "hide",
            label: "Hide from Glossary",
            description:
              "Enable to hide this entry from the glossary (E.g. for use in chapter-specific Nutshells)",
            required: true,
            ui: { defaultValue: false },
          },
          {
            name: "aliases",
            label: "Aliases",
            type: "string",
            list: true,
          },
        ],
        defaultItem: () => ({
          title: "New Glossary Entry",
          body: {
            type: "root",
            children: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Default Text",
                  },
                ],
              },
            ],
          },
          hide: false,
          aliases: [],
        }),
        ui: {
          router: ({ document }) => `/glossary/${document._sys.filename}`,
        },
      },
    ],
  },
});
