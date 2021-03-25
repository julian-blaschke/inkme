import { Badge, Flex, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Stack } from "@chakra-ui/layout";
import Link from "next/link";
import { Avatar } from "@chakra-ui/avatar";
import { Skeleton } from "@chakra-ui/skeleton";

export function ListItem({ title, subtitle, img, url, badge }) {
  const bg = useColorModeValue("gray.100", "gray.900");
  //TODO: make border color of listitems unique to their privacy status (owned, private, public...)
  //TODO: write FAQ on color codes for listitems & what they mean
  const border = useColorModeValue("pink.300", "pink.800");

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
        <Flex>{badge && <Badge colorScheme={badge.colorScheme}>{badge.content}</Badge>}</Flex>
      </Stack>
    </LinkBox>
  );
}

export function ListItemSkeleton() {
  return (
    <Skeleton>
      <ListItem></ListItem>
    </Skeleton>
  );
}
