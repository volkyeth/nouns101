import { Box, Center, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import volky from "../assets/team/volky.png";
import mikegood from "../assets/team/mikegood.png";
import zylag from "../assets/team/zylag.png";
import blowned from "../assets/team/blowned.svg";
import pepeEvil from "../assets/team/pepeEvil.webp";
import twitterLogo from "../assets/twitter.svg";
import { PixelButton } from "./PixelButton";
import Image, { StaticImageData } from "next/image";
import { PixelTooltip } from "./PixelTooltip";

export const Team = () => (
  <HStack
    w={"full"}
    justifyContent={"space-around"}
    flexWrap={"wrap"}
    rowGap={4}
    spacing={0}
  >
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
      tooltip={
        <VStack p={0}>
          <Image src={pepeEvil} alt={""} width={128} style={{ padding: 0 }} />
        </VStack>
      }
      image={mikegood}
      twitter={"GoodBeats"}
    />
    <Member
      color={"#254EFB"}
      name={"Blowned"}
      role={"Writer"}
      image={blowned}
      twitter={"BlownedEth"}
    />
    <Member
      color={"#4420C1"}
      name={"Zylag"}
      role={"Designer"}
      image={zylag}
      twitter={"zylageth"}
    />
  </HStack>
);
type MemberProps = {
  color: string;
  name: string;
  role: string;
  image: StaticImageData;
  twitter: string;
  tooltip?: ReactNode;
};

const Member: FC<MemberProps> = ({
  name,
  color,
  image,
  twitter,
  role,
  tooltip,
}) => {
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
          <PixelTooltip label={tooltip} bgColor={"white"}>
            <Text>{role}</Text>
          </PixelTooltip>
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
