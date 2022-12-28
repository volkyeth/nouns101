import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  // initialColorMode: 'light',
  useSystemColorMode: false,
  styles: {
    global: {
      "html, body": {
        color: "black",
      },
    },
  },
  fonts: {
    heading: `"LoRes 9 OT", sans-serif`,
    body: `"Nunito", sans-serif;`,
  },
  colors: {
    nouns101: {
      blue: "#2245C5",
      lightBlue: "#2E90FF",
      red: "#DD473F",
      lightRed: "#FF6B5C",
    },
  },
});

export default theme;
