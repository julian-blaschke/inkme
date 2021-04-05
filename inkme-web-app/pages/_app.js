import NavBar from "@/components/Navbar";
import { ProvideAuth } from "@/hooks/useAuth";
import theme from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import "styles/styles.css";
import "../styles/daypicker.css";

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
