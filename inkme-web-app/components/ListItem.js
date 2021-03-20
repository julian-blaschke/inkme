import { Flex, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Stack } from "@chakra-ui/layout";
import Link from "next/link";
import { Avatar } from "@chakra-ui/avatar";

export function ListItem({ title, subtitle, img, url, rightItem }) {
  const bg = useColorModeValue("gray.100", "gray.900");
  const border = useColorModeValue("blue.300", "blue.800");

  return (
    <LinkBox as="article">
      <Stack
        direction="row"
        justify="space-between"
        alignItems="center"
        p={2}
        spacing={4}
        borderRadius="md"
        border="1px"
        borderColor={border}
        borderStyle="dashed"
        _hover={{ bg }}
        role="group"
      >
        <Stack direction="row" alignItems="center" spacing={4}>
          <Avatar borderRadius="md" bg={bg} src={img}></Avatar>
          <Flex direction="column">
            <Link href={url || "#"}>
              <LinkOverlay href="">
                <Text fontSize="base">{title}</Text>
              </LinkOverlay>
            </Link>
            <Text fontSize="sm" color="gray.500" noOfLines={1}>
              {subtitle}
            </Text>
          </Flex>
        </Stack>
        <Flex>{rightItem}</Flex>
      </Stack>
    </LinkBox>
  );
}
