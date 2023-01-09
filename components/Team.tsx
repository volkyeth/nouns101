import {
  Box,
  Center,
  Divider,
  HStack,
  Link,
  SimpleGrid,
  Image as ChakraImage,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { PixelBox, ShadowedPixelBox } from "./ShadowedPixelBox";
import volky from "../assets/team/volky.png";
import mikegood from "../assets/team/mikegood.png";
import zylag from "../assets/team/zylag.png";
import blowned from "../assets/team/blowned.svg";
import { Link as ChakraLink } from "@chakra-ui/layout";
import twitterLogo from "../assets/twitter.svg";
import { PixelButton } from "./PixelButton";
import Image, { StaticImageData } from "next/image";

export const Team = () => (
  <HStack w={"full"} justifyContent={"space-around"} flexWrap={"wrap"}>
    <Member
      color={"#FF638D"}
      name={"Volky"}
      role={"Developer"}
      image={volky}
      twitter={"volkyeth"}
    />

    <Member
      color={"#EC5B43"}
      name={"MikeGood"}
      role={"Mastermind"}
      image={mikegood}
      twitter={"volkyeth"}
    />
    <Member
      color={"#254EFB"}
      name={"Blowned"}
      role={"Writer"}
      image={blowned}
      twitter={"volkyeth"}
    />
    <Member
      color={"#4420C1"}
      name={"Zylag"}
      role={"Designer"}
      image={zylag}
      twitter={"volkyeth"}
    />
  </HStack>
);
type MemberProps = {
  color: string;
  name: string;
  role: string;
  image: StaticImageData;
  twitter: string;
};

const Member: FC<MemberProps> = ({ name, color, image, twitter, role }) => {
  return (
    <Box boxShadow={"4px 4px black"} borderWidth={2} borderColor={"black"}>
      <VStack spacing={0}>
        <Center w={"full"} bgColor={"#e1d7d5"}>
          <Image src={image} alt={name} width={128} height={128} />
          {/*<ChakraImage src={image.src} alt={name} w={"full"} />*/}
        </Center>
        <VStack
          bgColor={color}
          w={"full"}
          color={"white"}
          p={4}
          borderTopWidth={2}
          borderTopColor={"black"}
        >
          <Text
            fontFamily={`"LoRes 9 OT",sans-serif`}
            fontSize={"xs"}
            fontWeight={"bold"}
          >
            {name}
          </Text>
          <Text>{role}</Text>
          <PixelButton bgColor={"#1D9BF0"} minW={7}>
            <Link href={`https://twitter.com/${twitter}`} isExternal>
              <Image src={twitterLogo} alt={"twitter"} />
            </Link>
          </PixelButton>
        </VStack>
      </VStack>
    </Box>
  );
};
