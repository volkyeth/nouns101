import { FC, PropsWithChildren, ReactNode } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Box, Container, ContainerProps, VStack } from "@chakra-ui/react";

export type MainLayoutProps = {
  navbarExtraContent?: ReactNode;
} & ContainerProps;

export const Main: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
  navbarExtraContent,
  ...containerProps
}) => (
  <VStack spacing={0} w={"full"} h={"100vh"} justifyItems={"stretch"}>
    <Navbar py={2} extraContent={navbarExtraContent} />
    <Box bgColor="#FBF0DF" w={"full"} flexGrow={1}>
      <MainContainer py={10} h={"full"} {...containerProps}>
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
