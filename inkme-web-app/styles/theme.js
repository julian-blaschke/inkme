// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.900", "whiteAlpha.900")(props),
      bg: mode("gray.100", "gray.900")(props),
    },
  }),
};

// 3. extend the theme
const theme = extendTheme({ config, styles });
theme.shadows.outline = "pink.300";
export default theme;
