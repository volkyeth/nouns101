import Image from "next/image";
import logo from "../assets/noggle101.svg";
import {
  Center,
  CenterProps,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { MainContainer } from "./MainLayout";
import NextLink from "next/link";

export const Footer: FC<CenterProps> = (props) => (
  <Center bgColor={"#FFE7BF"} w={"full"} {...props}>
    <Stack
      alignItems={"center"}
      direction={["column", "row"]}
      justifyContent={"space-between"}
      fontFamily={`"LoRes 12 OT",sans-serif`}
      w={"full"}
      px={8}
      spacing={10}
    >
      <NextLink href={"/"}>
        <Image src={logo} alt={"logo"} height={20} />
      </NextLink>
      <Stack
        alignItems={"center"}
        direction={["column", "row"]}
        spacing={[4, 12]}
        divider={<Text mx={{ base: 4, lg: 8 }}>·</Text>}
      >
        <Link href={"https://lilnouns.wtf/vote/57"} isExternal>
          Funded by Lil Nouns DAO ⌐◧-◧
        </Link>

        <Link
          href={"https://vercel.com/?utm_source=Nouns101&utm_campaign=oss"}
          isExternal
        >
          Powered by ▲
        </Link>
        <NextLink href={"/glossary/cc0"}>CC0</NextLink>
      </Stack>
    </Stack>
  </Center>
);
