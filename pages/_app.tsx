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
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      {process.env.GA_MEASUREMENT_ID && (
        <Script id="gtm" strategy={"beforeInteractive"}>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.GA_MEASUREMENT_ID}');`}
        </Script>
      )}
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
