// 1. import `extendTheme` function
import { extendTheme, useColorModeValue } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    900: "#2E2E2E",
    800: "#474747",
    700: "#61605F",
    600: "#7A7978",
    500: "#939291",
    400: "#ACABA9",
    300: "#C6C4C2",
    200: "#DFDDDA",
    100: "#F8F6F3",
  },
};

const styles = {
  global: (props) => ({
    body: {
      color: mode("brand.900", "brand.100")(props),
      bg: mode("brand.100", "brand.900")(props),
    },
  }),
};

const components = {
  global: (props) => ({
    Modal: {
      parts: ["dialog"],
      baseStyle: {
        dialog: {
          background: mode("brand", "brand.900")(props),
          py: 8,
        },
      },
    },
    Divider: {
      baseStyle: {
        borderColor: "brand.500",
        opacity: 1,
      },
      defaultProps: { variant: "dashed" },
    },
  }),
};

// 3. extend the theme
const theme = extendTheme({ config, styles, colors, components });

export default theme;

export function useBackGroundColorValue() {
  return useColorModeValue("brand.100", "brand.900");
}

export function useHoverColorValue() {
  return useColorModeValue("brand.200", "brand.800");
}

export const primaryColorScheme = "brand";
