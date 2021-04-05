import { usePrimaryColor } from "@/styles/usePrimaryColor";
import { Avatar } from "@chakra-ui/avatar";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Badge, Flex, LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import Link from "next/link";
import { useMemo } from "react";

export function ListItem({ title, subtitle, img, url, badge, menu }) {
  const bg = useColorModeValue("white", "black");
  //TODO: make border color of listitems unique to their privacy status (owned, private, public...)
  //TODO: write FAQ on color codes for listitems & what they mean
  const border = usePrimaryColor();
  const isLink = useMemo(() => !!url, [url]);

  return (
    <LinkBox as="article">
      <Stack
        direction="row"
        justify="space-between"
        alignItems="center"
        p={2}
        spacing={4}
        borderRadius="md"
        border="2px"
        borderColor={border}
        borderStyle="groove"
        _hover={{ bg }}
        role="group"
      >
        <Stack direction="row" alignItems="center" spacing={4}>
          <Avatar borderRadius="md" bg={bg} src={img}></Avatar>
          <Flex direction="column">
            {isLink ? (
              <Link href={url}>
                <LinkOverlay href="">
                  <Text fontSize="base">{title}</Text>
                </LinkOverlay>
              </Link>
            ) : (
              <Text fontSize="base">{title}</Text>
            )}
            <Text fontSize="sm" color="gray.500" noOfLines={1}>
              {subtitle}
            </Text>
          </Flex>
        </Stack>
        <Flex>{badge && <Badge colorScheme={badge.colorScheme}>{badge.content}</Badge>}</Flex>
        {menu}
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
