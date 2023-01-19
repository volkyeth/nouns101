import { Head, Html, Main, NextScript } from "next/document";
import { chakra } from "@chakra-ui/react";
import Script from "next/script";

export default function Document() {
  const gaMeasurementId = process.env.GA_MEASUREMENT_ID;
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        {gaMeasurementId && (
          <Script>
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gaMeasurementId}');`}
          </Script>
        )}
      </Head>
      <body>
        {gaMeasurementId && (
          <noscript>
            <chakra.iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gaMeasurementId}`}
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
