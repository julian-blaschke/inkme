import { ChakraProvider } from "@chakra-ui/react";
import { ProvideAuth } from "../lib/hooks/useAuth.js";
import NavBar from "../components/Navbar";

function InkmeApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NavBar></NavBar>
      <ProvideAuth>
        <Component {...pageProps} />
      </ProvideAuth>
    </ChakraProvider>
  );
}
export default InkmeApp;
