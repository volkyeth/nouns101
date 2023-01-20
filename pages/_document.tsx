import { Head, Html, Main, NextScript } from "next/document";
import { chakra } from "@chakra-ui/react";
import Script from "next/script";

export default function Document() {
  const gaMeasurementId = process.env.GA_MEASUREMENT_ID;
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <body>
        {process.env.GA_MEASUREMENT_ID && (
          <noscript>
            <chakra.iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.GA_MEASUREMENT_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></chakra.iframe>
          </noscript>
        )}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
