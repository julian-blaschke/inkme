import { useKeyPress } from "@/hooks/useKeyPress";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Image } from "@chakra-ui/image";
import { Flex, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function SearchResult({ title, subtitle, img, url, isFocused }) {
  const bg = useColorModeValue("gray.100", "gray.700");
  const { push } = useRouter();
  const isPressed = useKeyPress("Enter");

  useEffect(() => {
    if (isPressed && isFocused) {
      push(url);
    }
  }, [isPressed]);

  return (
    <LinkBox as="article" tabIndex={0}>
      <Stack
        direction="row"
        justify="space-between"
        bg={isFocused && bg}
        alignItems="center"
        p={2}
        spacing={4}
        borderRadius="md"
        _hover={{ bg }}
        role="group"
      >
        <Stack direction="row" alignItems="center" spacing={4}>
          <Image src={img} height={10} width={10} borderRadius="100%"></Image>
          <Flex direction="column">
            <Link href={url}>
              <LinkOverlay href="">{title}</LinkOverlay>
            </Link>
            <Text fontSize="xs" color="gray.500">
              {subtitle}
            </Text>
          </Flex>
        </Stack>
        <Stack direction="row"></Stack>
      </Stack>
    </LinkBox>
  );
}
