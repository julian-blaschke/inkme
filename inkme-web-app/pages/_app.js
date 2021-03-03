import { ChakraProvider } from "@chakra-ui/react";
import "styles/styles.css";

import NavBar from "@/components/Navbar";
import { ProvideAuth } from "@/hooks/useAuth";

export default function InkmeApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ProvideAuth>
        <NavBar></NavBar>
        <Component {...pageProps} />
      </ProvideAuth>
    </ChakraProvider>
  );
}
