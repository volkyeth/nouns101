import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";

export type BrowserPicProps = {
  image: string;
  alt?: string;
  description?: string;
};

export const BrowserPic: FC<BrowserPicProps> = ({
  image,
  alt = "screenshot",
  description,
}) => (
  <VStack>
    <VStack
      borderWidth={2}
      borderColor={"gray.200"}
      borderRadius={4}
      spacing={0}
    >
      <HStack p={2} alignItems={"start"} w={"full"} bgColor={"gray.200"}>
        {["#FF605C", "#FFBD44", "#00CA4E"].map((color, idx) => (
          <Box
            key={`dot-${idx}`}
            bgColor={color}
            borderRadius={"full"}
            w={2}
            h={2}
          />
        ))}
      </HStack>
      <Image overflow={"hidden"} pt={-4} src={image} alt={alt} w={"full"} />
    </VStack>
    {description && <Text>{description}</Text>}
  </VStack>
);
