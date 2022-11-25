import {
  Button,
  ButtonProps,
  Center,
  CenterProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  Input,
  Image as ChakraImage,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import logo from "../assets/101-logo.svg";
import { PixelButton, PixelButtonProps } from "./PixelButton";
import twitter from "../assets/twitter.svg";
import figma from "../assets/figma.svg";
import discord from "../assets/discord.svg";
import { useIsMobile } from "../hooks/mobile";
import { FC, ReactNode, useRef } from "react";
import Close from "pixelarticons/svg/close.svg";
import Link from "next/link";
import { MainContainer } from "../layouts/Main";

const socialsButtonProps: Partial<PixelButtonProps> = {
  minW: 8,
  p: 0,
  pixelSize: 2,
};

export type NavbarProps = {
  extraContent?: ReactNode;
} & CenterProps;

export const Navbar: FC<NavbarProps> = ({ extraContent, ...props }) => {
  const isMobile = useIsMobile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Center
      bgColor={"#FFE7BF"}
      w={"full"}
      h={"80px"}
      borderBottomWidth={3}
      borderColor={"black"}
      {...props}
    >
      <MainContainer>
        <VStack>
          <>
            <HStack w={"full"} justifyContent={"space-between"}>
              <Link href={"/"}>
                <Image src={logo} layout={"fixed"} height={24} />
              </Link>
              {!isMobile ? (
                <>
                  <HStack spacing={4}>
                    <Link href={"/"}>
                      <PixelButton w={40}>Chapters</PixelButton>
                    </Link>
                    <PixelButton w={40}>Glossary</PixelButton>
                  </HStack>

                  <HStack spacing={2}>
                    <PixelButton bgColor={"#1D9BF0"} {...socialsButtonProps}>
                      <Image src={twitter} />
                    </PixelButton>
                    <PixelButton bgColor={"black"} {...socialsButtonProps}>
                      <Image src={figma} />
                    </PixelButton>
                    <PixelButton bgColor={"#5865F2"} {...socialsButtonProps}>
                      <Image src={discord} />
                    </PixelButton>
                  </HStack>
                </>
              ) : (
                <>
                  <PixelButton ref={menuButtonRef} minW={24} onClick={onOpen}>
                    Menu
                  </PixelButton>
                  <Drawer
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    finalFocusRef={menuButtonRef}
                  >
                    <DrawerOverlay />
                    <DrawerContent
                      bgColor={"#FFF"}
                      borderRightWidth={3}
                      borderColor={"black"}
                    >
                      <DrawerCloseButton>
                        <ChakraImage src={Close.src} />
                      </DrawerCloseButton>
                      <DrawerHeader
                        color={"#2245C5"}
                        fontFamily={`"Lores 12 OT", sans-serif;`}
                      >
                        Menu
                      </DrawerHeader>

                      <DrawerBody></DrawerBody>

                      <DrawerFooter></DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </>
              )}
            </HStack>
            {extraContent && extraContent}
          </>
        </VStack>
      </MainContainer>
    </Center>
  );
};
