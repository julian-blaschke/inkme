import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Badge, Flex, LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import Link from "next/link";
import { useMemo } from "react";

export function ListItem({ title, subtitle, img, url, badge, menu }) {
  const hover = useColorModeValue("gray.200", "gray.800");
  //TODO: make border color of listitems unique to their privacy status (owned, private, public...)
  //TODO: write FAQ on color codes for listitems & what they mean
  const isLink = useMemo(() => !!url, [url]);

  return (
    <LinkBox as="article">
      <Stack direction="row" justify="space-between" alignItems="center" p={2} spacing={4} borderRadius="md" _hover={{ bg: hover }} role="group">
        <Stack direction="row" alignItems="center" spacing={4}>
          {Array.isArray(img) ? (
            <AvatarGroup>
              {img.map((i) => (
                <Avatar borderRadius="md" src={i}></Avatar>
              ))}
            </AvatarGroup>
          ) : (
            <Avatar borderRadius="md" src={img}></Avatar>
          )}
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
        <Flex align="center">
          <Flex mr={menu && 4}>{badge && <Badge colorScheme={badge.colorScheme}>{badge.content}</Badge>}</Flex>
          {menu}
        </Flex>
      </Stack>
    </LinkBox>
  );
}
