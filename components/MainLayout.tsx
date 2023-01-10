import { FC, PropsWithChildren, ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import {
  Box,
  BoxProps,
  Container,
  ContainerProps,
  VStack,
} from "@chakra-ui/react";

export type MainLayoutProps = {
  navbarExtraContent?: ReactNode;
  bgColor?: string;
  contentWrapperProps?: BoxProps;
} & ContainerProps;

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
  navbarExtraContent,
  bgColor = "#FBF0DF",
  contentWrapperProps,
  ...containerProps
}) => (
  <VStack spacing={0} w={"full"} h={["full", "100vh"]} overflowX={"clip"}>
    <Navbar py={2} extraContent={navbarExtraContent} />
    <Box
      bgColor={bgColor}
      w={"full"}
      flexGrow={1}
      bgGradient={
        "linear(to-b, #FFE7BF00 0%, 92.5%, #FFE7BF40 92.5%, #FFE7BF40 95%, #FFE7BF80 95%, #FFE7BF80 97.5%, #FFE7BFC0 97.5%,#FFE7BFC0 )"
      }
      {...contentWrapperProps}
    >
      <MainContainer py={10} px={6} h={"full"} {...containerProps}>
        {children}
      </MainContainer>
    </Box>
    <Footer py={2} zIndex={10} />
  </VStack>
);

export const MainContainer: FC<ContainerProps> = ({ children, ...props }) => (
  <Container maxW={"container.lg"} {...props}>
    {children}
  </Container>
);
