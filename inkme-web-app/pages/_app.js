import { Box, ChakraProvider } from "@chakra-ui/react";
import "styles/styles.css";
import theme from "@/styles/theme";

import NavBar from "@/components/Navbar";
import { ProvideAuth } from "@/hooks/useAuth";

export default function InkmeApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ProvideAuth>
        <NavBar></NavBar>
        <Component {...pageProps} />
      </ProvideAuth>
    </ChakraProvider>
  );
}
