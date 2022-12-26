import type { AppProps } from "next/app";
import theme from "../theme";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/roboto";
import "@fontsource/londrina-solid";
import { Fonts } from "../components/Fonts";
import "@fontsource/nunito";
import { Nouns101MdxProvider } from "../components/Nouns101MdxProvider";
import "../styles/globals.css";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <Nouns101MdxProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Script src={"https://platform.twitter.com/widgets.js"} />
          <Fonts />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </Nouns101MdxProvider>
  );
}

export default MyApp;
