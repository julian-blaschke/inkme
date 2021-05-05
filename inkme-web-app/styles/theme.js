// 1. import `extendTheme` function
import { extendTheme, useColorModeValue } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export function useBackGroundColorValue() {
  return useColorModeValue("white", "gray.900");
}

export function useForeGroundColorValue() {
  return useColorModeValue("bg.900", "bg.100");
}

export function useHoverColorValue() {
  return useColorModeValue("gray.200", "gray.700");
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
    900: "#163847",
    800: "#2D4F5E",
    700: "#446675",
    600: "#5B7D8C",
    500: "#7394A3",
    400: "#8AABBA",
    300: "#A1C2D1",
    200: "#B8D9E8",
    100: "#CFF0FF",
  },
};

const styles = {
  global: (props) => ({
    body: {
      color: mode("bg.900", "gray.100")(props),
      bg: mode("whiteAlpha", "gray.900")(props),
    },
    "::selection": {
      bg: mode("brand.100", "brand.500")(props),
    },
  }),
};

const components = {
  Modal: {
    parts: ["dialog"],
    baseStyle: ({ colorMode }) => ({
      dialog: {
        background: colorMode === "dark" ? "gray.900" : "white",
        mx: 4,
      },
    }),
  },
  Menu: {
    parts: ["list", "item"],
    baseStyle: ({ colorMode }) => ({
      list: {
        background: colorMode === "dark" ? "gray.900" : "white",
      },
      item: {
        _focus: {
          background: colorMode === "dark" ? "gray.800" : "gray.50",
        },
        _active: {
          background: colorMode === "dark" ? "gray.700" : "gray.100",
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
