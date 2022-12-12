import type { AppProps } from "next/app";
import theme from "../theme";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/roboto";
import "@fontsource/londrina-solid";
import { Fonts } from "../components/Fonts";
import "@fontsource/nunito";
import { Nouns101MdxProvider } from "../components/Nouns101MdxProvider";
import "react-static-tweets/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Nouns101MdxProvider>
      <ChakraProvider theme={theme}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </Nouns101MdxProvider>
  );
}

export default MyApp;
