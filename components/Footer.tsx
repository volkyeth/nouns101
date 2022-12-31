import Image from "next/image";
import logo from "../assets/noggle101.svg";
import { Center, CenterProps, HStack, Link } from "@chakra-ui/react";
import { FC } from "react";
import { MainContainer } from "./MainLayout";

export const Footer: FC<CenterProps> = (props) => (
  <Center bgColor={"#FFE7BF"} w={"full"} {...props}>
    <MainContainer>
      <HStack justifyContent={"space-between"}>
        <Image src={logo} alt={"logo"} />
        <Link
          href={"https://vercel.com/?utm_source=Nouns101&utm_campaign=oss"}
          isExternal
          fontFamily={`"LoRes 12 OT",sans-serif`}
        >
          Powered by ▲
        </Link>
      </HStack>
    </MainContainer>
  </Center>
);
