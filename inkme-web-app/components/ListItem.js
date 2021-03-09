import { Flex, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Image } from "@chakra-ui/image";
import { Stack } from "@chakra-ui/layout";
import Link from "next/link";

export function ListItem({ title, subtitle, img, url, rightItem }) {
  const bg = useColorModeValue("gray.100", "gray.800");

  return (
    <LinkBox as="li">
      <Stack direction="row" justify="space-between" alignItems="center" p={2} spacing={4} borderRadius="md" _hover={{ bg }} role="group">
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
        <Flex>{rightItem}</Flex>
      </Stack>
    </LinkBox>
  );
}
