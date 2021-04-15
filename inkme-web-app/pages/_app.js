import NavBar from "@/components/Navbar";
import { ProvideAuth } from "@/hooks/useAuth";
import theme from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import "styles/styles.css";
import "../styles/daypicker.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function InkmeApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ProvideAuth>
        <NavBar />
        <Component {...pageProps} />
      </ProvideAuth>
    </ChakraProvider>
  );
}
