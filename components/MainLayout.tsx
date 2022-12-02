import { FC, PropsWithChildren, ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Box, Container, ContainerProps, VStack } from "@chakra-ui/react";

export type MainLayoutProps = {
  navbarExtraContent?: ReactNode;
  bgColor?: string;
} & ContainerProps;

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
  navbarExtraContent,
  bgColor = "#FBF0DF",
  ...containerProps
}) => (
  <VStack spacing={0} w={"full"} h={["full", "100vh"]} overflowX={"clip"}>
    <Navbar py={2} extraContent={navbarExtraContent} />
    <Box bgColor={bgColor} w={"full"} flexGrow={1}>
      <MainContainer py={10} px={6} h={"full"} {...containerProps}>
        {children}
      </MainContainer>
    </Box>
    <Footer py={2} />
  </VStack>
);

export const MainContainer: FC<ContainerProps> = ({ children, ...props }) => (
  <Container maxW={"container.lg"} {...props}>
    {children}
  </Container>
);