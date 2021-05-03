import { useHoverColorValue } from "@/styles/theme";
import { Badge, Flex, LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/layout";
import Link from "next/link";
import { useMemo } from "react";
import { Avatar } from "./Avatar";

export function ListItem({ title, subtitle, img, url, badge, menu }) {
  const hover = useHoverColorValue();
  //TODO: write FAQ on color codes for listitems & what they mean
  const isLink = useMemo(() => !!url, [url]);

  return (
    <LinkBox as="article" width="full">
      <Stack
        direction="row"
        justify="space-between"
        alignItems="center"
        p={2}
        spacing={4}
        borderRadius="md"
        // will have a bg on mobile, & a hover-bg on larger devices
        _hover={{ bg: { sm: hover } }}
        bg={{ base: hover, sm: "transparent" }}
        role="group"
      >
        <Stack direction="row" alignItems="center" spacing={4}>
          <Avatar img={img} />
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
            <Text fontSize="sm" color="gray.500" noOfLines={1}>
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
