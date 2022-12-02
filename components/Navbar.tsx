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
  Text,
  StackProps,
} from "@chakra-ui/react";
import Image from "next/image";
import logo from "../assets/noggle101.svg";
import { PixelButton, PixelButtonProps } from "./PixelButton";
import twitter from "../assets/twitter.svg";
import figma from "../assets/figma.svg";
import discord from "../assets/discord.svg";
import thinArrow from "../assets/thinArrowRight.svg";
import { useIsMobile } from "../hooks/mobile";
import { FC, ReactNode, useRef } from "react";
import close from "../assets/close.svg";
import Link from "next/link";
import { MainContainer } from "./MainLayout";
import { useRouter } from "next/router";

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
  const { pathname } = useRouter();
  const nav = [
    { href: "/", label: "Chapters" },
    { href: "/glossary", label: "Glossary" },
  ];

  return (
    <Center
      bgColor={"#FFE7BF"}
      w={"full"}
      borderBottomWidth={3}
      borderColor={"black"}
      {...props}
    >
      <MainContainer>
        <VStack spacing={[2, 8]}>
          <>
            <HStack w={"full"} justifyContent={"space-between"}>
              <Link href={"/"}>
                <Image alt={"Nouns101 logo"} src={logo} height={24} />
              </Link>
              {!isMobile ? (
                <>
                  <HStack spacing={4}>
                    {nav.map(({ href, label }) => (
                      <Link key={label} href={href}>
                        <PixelButton w={40}>{label}</PixelButton>
                      </Link>
                    ))}
                  </HStack>

                  <Socials />
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
                        <Image src={close} alt={"close"} width={48} />
                      </DrawerCloseButton>
                      <DrawerHeader
                        color={"black"}
                        fontFamily={`"Lores 12 OT", sans-serif;`}
                      >
                        Menu
                      </DrawerHeader>

                      <DrawerBody>
                        <VStack
                          h={"full"}
                          justifyContent={"space-between"}
                          alignItems={"start"}
                          color={"#2245C5"}
                          fontSize={"lg"}
                          fontWeight={"extrabold"}
                          fontFamily={`"Lores 12 OT", sans-serif;`}
                        >
                          <VStack spacing={4}>
                            {nav.map(({ href, label }) => {
                              console.log({ pathname, href });
                              const isCurrent = href === pathname;
                              return (
                                <Link key={label} href={href}>
                                  <HStack>
                                    {isCurrent && (
                                      <Image src={thinArrow} alt={"arrow"} />
                                    )}
                                    <Text>{label}</Text>
                                  </HStack>
                                </Link>
                              );
                            })}
                          </VStack>
                          <Socials spacing={6} />
                        </VStack>
                      </DrawerBody>

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

const Socials: FC<StackProps> = (props) => (
  <HStack spacing={2} {...props}>
    <PixelButton bgColor={"#1D9BF0"} {...socialsButtonProps}>
      <Image alt={"twitter"} src={twitter} />
    </PixelButton>
    <PixelButton bgColor={"black"} {...socialsButtonProps}>
      <Image alt={"figma"} src={figma} />
    </PixelButton>
    <PixelButton bgColor={"#5865F2"} {...socialsButtonProps}>
      <Image alt={"discord"} src={discord} />
    </PixelButton>
  </HStack>
);
