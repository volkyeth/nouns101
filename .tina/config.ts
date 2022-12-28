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
      name: "forceOpen",
      label: "Force open",
      description: "Enable to force the nutshell to be always open",
    },
  ],
};

const Tweet: Template = {
  name: "Tweet",
  label: "Tweet",
  fields: [
    {
      type: "string",
      name: "tweetLink",
      label: "Tweet Link",
      description:
        "Enter the link to the tweet. Example: If the full link is https://twitter.com/volkyeth/status/1605300170958282754?s=20&t=Sv3FCtHeVAOAO7Pcf6JH5g, use volkyeth/status/1605300170958282754 as the tweet link",
      required: true,
      isTitle: true,
    },
    {
      type: "string",
      name: "align",
      label: "Align",
      options: ["center", "left", "right"],
    },
    { name: "hideConversation", label: "Hide Conversation", type: "boolean" },
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

const templates = [{ ...nutshell, inline: true }, Tweet, YouTube];

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
        ui: {
          router: ({ document }) => `/glossary/${document._sys.filename}`,
        },
      },
    ],
  },
});
