import { useColorModeValue } from "@chakra-ui/color-mode";

export const primaryColorScheme = "yellow";

export function usePrimaryColor() {
  return useColorModeValue(`${primaryColorScheme}.500`, `${primaryColorScheme}.300`);
}
