import Image from "next/image";
import logo from "../assets/noggle101.svg";
import { Center, CenterProps } from "@chakra-ui/react";
import { FC } from "react";
import { MainContainer } from "./MainLayout";

export const Footer: FC<CenterProps> = (props) => (
  <Center bgColor={"#FFE7BF"} w={"full"} {...props}>
    <MainContainer>
      <Image src={logo} alt={"logo"} />
    </MainContainer>
  </Center>
);
