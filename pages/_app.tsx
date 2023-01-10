import type { AppProps } from "next/app";
import theme from "../theme";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/roboto";
import "@fontsource/londrina-solid";
import { Fonts } from "../components/Fonts";
import "@fontsource/nunito";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Fonts />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
