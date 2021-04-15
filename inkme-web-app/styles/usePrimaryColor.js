import { useColorModeValue } from "@chakra-ui/color-mode";

export const primaryColorScheme = "gray";

export function usePrimaryColor() {
  return useColorModeValue(`${primaryColorScheme}.500`, `${primaryColorScheme}.300`);
}

export function usePrimaryBackgroundColor() {
  return useColorModeValue("gray.100", "gray.900");
}
