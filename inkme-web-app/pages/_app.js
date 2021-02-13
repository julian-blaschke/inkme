import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../components/Navbar";

function InkmeApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NavBar></NavBar>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default InkmeApp;
