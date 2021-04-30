// 1. import `extendTheme` function
import { extendTheme, useColorModeValue } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export function useBackGroundColorValue() {
  return useColorModeValue("white", "bg.900");
}

export function useForeGroundColorValue() {
  return useColorModeValue("bg.900", "bg.100");
}

export function useHoverColorValue() {
  return useColorModeValue("gray.100", "bg.800");
}

export const primaryColorScheme = "brand";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  bg: {
    900: "#1C1C1C",
    800: "#383735",
    700: "#55524E",
    600: "#716D66",
    500: "#8E887F",
    400: "#AAA398",
    300: "#C6BEB1",
    200: "#E3D9C9",
    100: "#FFF4E2",
  },
  brand: {
    900: "#F3B32C",
    800: "#F4B736",
    700: "#F5BA40",
    600: "#F5BE49",
    500: "#F6C253",
    400: "#F7C55D",
    300: "#F8C967",
    200: "#F8CC70",
    100: "#F9D07A",
  },
};

const styles = {
  global: (props) => ({
    body: {
      color: mode("bg.900", "white")(props),
      bg: mode("whiteAlpha", "bg.900")(props),
    },
    "::selection": {
      bg: mode("brand.100", "bg.200")(props),
    },
  }),
};

const components = {
  Modal: {
    parts: ["dialog"],
    baseStyle: ({ colorMode }) => ({
      dialog: {
        background: colorMode === "dark" ? "bg.900" : "white",
        mx: 4,
      },
    }),
  },
  Menu: {
    parts: ["list", "item"],
    baseStyle: ({ colorMode }) => ({
      list: {
        background: colorMode === "dark" ? "bg.900" : "white",
      },
      item: {
        _focus: {
          background: colorMode === "dark" ? "bg.800" : "gray.50",
        },
        _active: {
          background: colorMode === "dark" ? "bg.700" : "gray.100",
        },
      },
    }),
  },
  Divider: {},
  IconButton: {
    baseStyle: ({ colorMode }) => ({
      _focus: {
        background: colorMode === "dark" ? "bg.800" : "bg.200",
      },
    }),
  },
  Button: {
    baseStyle: {
      colorScheme: primaryColorScheme,
    },
    variants: {
      link: {
        mt: 8,
      },
    },
  },
};

// 3. extend the theme
const theme = extendTheme({ config, styles, colors, components });

export default theme;
