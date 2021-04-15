import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const menus = [
  { title: "Artists", href: "/artists" },
  { title: "Profile Settings", href: "/profile/settings" },
  { title: "Security & Privacy", href: "/profile/security&privacy" },
  { title: "Shops", href: "/profile/shops" },
];

export function DashboardSideBar({ showOnlyIcons }) {
  const router = useRouter();
  const [active, setActive] = useState("");
  const activeColor = useColorModeValue("gray.300", "gray.700");
  const bg = useColorModeValue("gray.200", "gray.800");

  useEffect(() => {
    if (router) {
      setActive(router.asPath);
    }
  }, []);

  return (
    <Flex
      justify="center"
      as="nav"
      spacing={12}
      mx={4}
      py={4}
      mt={4}
      position="fixed"
      width={showOnlyIcons ? 16 : 52}
      borderRadius="md"
      height="full"
    >
      <Stack as="ul" listStyleType="none" spacing={6} justifyContent="flex-start" alignItems="flex-start">
        {menus.map(({ title, href, icon }) => (
          <LinkBox as="li" bg={active === href ? activeColor : ""} borderRadius="md" px={4} py={2} width="full">
            <Link href={href}>
              <LinkOverlay href="#">
                <Stack isInline spacing={4} alignItems="center">
                  {icon}
                  {!showOnlyIcons && <Text fontSize="sm">{title}</Text>}
                </Stack>
              </LinkOverlay>
            </Link>
          </LinkBox>
        ))}
      </Stack>
    </Flex>
  );
}
