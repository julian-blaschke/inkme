import { useColorModeValue } from "@chakra-ui/color-mode";

export function useMenuBackgroundValue() {
  return useColorModeValue("gray.100", "gray.900");
}
