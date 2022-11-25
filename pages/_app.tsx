import type { AppProps } from "next/app";
import theme from "../theme";
import Clippy from "../public/lil-clippy.svg";
import {
  Box,
  Button,
  chakra,
  ChakraProvider,
  Collapse,
  Heading,
  Link,
  Slide,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import "@fontsource/roboto";
import "@fontsource/londrina-solid";
import { MDXProvider } from "@mdx-js/react";
import { ComponentProps, FC, ReactNode } from "react";
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  motion,
} from "framer-motion";
import Script from "next/script";
import { ClippySays } from "../components/ClippySays";
import Image from "next/image";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Fonts } from "../components/Fonts";
import "@fontsource/nunito";
import { Nutshell } from "../components/Nutshell";
import { Nouns101MdxProvider } from "../components/Nouns101MdxProvider";

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
