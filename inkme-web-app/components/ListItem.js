import { useHoverColorValue } from "@/styles/theme";
import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import { Badge, Flex, LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/layout";
import Link from "next/link";
import { useMemo } from "react";

export function ListItem({ title, subtitle, img, url, badge, menu }) {
  const hover = useHoverColorValue();
  //TODO: make border color of listitems unique to their privacy status (owned, private, public...)
  //TODO: write FAQ on color codes for listitems & what they mean
  const isLink = useMemo(() => !!url, [url]);

  return (
    <LinkBox as="article">
      <Stack direction="row" justify="space-between" alignItems="center" p={2} spacing={4} borderRadius="md" _hover={{ bg: hover }} role="group">
        <Stack direction="row" alignItems="center" spacing={4}>
          {Array.isArray(img) ? (
            <AvatarGroup spacing={-6} border="none" bg="transparent">
              {img.slice(0, 3).map((src, index) => (
                <Avatar key={index} borderRadius="md" bg="transparent" src={src}></Avatar>
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
              <Text fontSize="base" isTruncated>
                {title}
              </Text>
            )}
            <Text fontSize="sm" color="brand.500" noOfLines={1}>
              {subtitle}
            </Text>
          </Flex>
        </Stack>
        <Flex align="center">
          <Flex mr={menu && 4}>
            {badge && (
              <Badge fontSize="xx-small" colorScheme={badge.colorScheme}>
                {badge.content}
              </Badge>
            )}
          </Flex>
          {menu}
        </Flex>
      </Stack>
    </LinkBox>
  );
}
