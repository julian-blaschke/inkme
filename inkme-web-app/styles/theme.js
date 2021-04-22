// 1. import `extendTheme` function
import { extendTheme, useColorModeValue } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export function useBackGroundColorValue() {
  return useColorModeValue("bg.100", "bg.900");
}

export function useHoverColorValue() {
  return useColorModeValue("bg.200", "bg.800");
}

export const primaryColorScheme = "brand";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  bg: {
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
      color: mode("bg.900", "bg.100")(props),
      bg: mode("bg.100", "bg.900")(props),
    },
    "::selection": {
      bg: "brand.100",
    },
  }),
};

const components = {
  Modal: {
    parts: ["dialog"],
    baseStyle: ({ colorMode }) => ({
      dialog: {
        background: colorMode === "dark" ? "bg.900" : "bg.100",
        mx: 4,
      },
    }),
  },
  Menu: {
    parts: ["list", "item"],
    baseStyle: ({ colorMode }) => ({
      list: {
        background: colorMode === "dark" ? "bg.900" : "bg.100",
      },
      item: {
        _focus: {
          background: colorMode === "dark" ? "bg.800" : "bg.200",
        },
        _active: {
          background: colorMode === "dark" ? "bg.700" : "bg.300",
        },
      },
    }),
  },
  Divider: {
    baseStyle: ({ colorMode }) => ({
      borderColor: colorMode === "dark" ? "bg.100" : "bg.900",
      opacity: 1,
    }),
    defaultProps: { variant: "dashed" },
  },
  IconButton: {
    baseStyle: ({ colorMode }) => ({
      _hover: {
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
  AvatarGroup: {
    baseStyle: {
      max: 2,
      borderRadius: "md",
    },
  },
};

// 3. extend the theme
const theme = extendTheme({ config, styles, colors, components });

export default theme;
