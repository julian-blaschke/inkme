import { useColorModeValue } from "@chakra-ui/color-mode";
import { LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const menus = [
  {
    title: "shops",
    items: [
      { title: "All Appointments", href: "appointments" },
      { title: "All Shops", href: "shops" },
    ],
  },
  {
    title: "profile",
    items: [
      { title: "Settings", href: "settings" },
      { title: "Security & Privacy", href: "security" },
    ],
  },
  { title: "other", items: [{ title: "Messages", href: "messages" }] },
];

export function DashboardSideBar() {
  const router = useRouter();
  const [active, setActive] = useState("");
  const activeColor = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    if (router) {
      setActive(router.asPath.split("/").pop());
    }
  }, []);

  return (
    <Stack as="nav" spacing={12} px={8} width="xs" display={{ base: "none", md: "block" }} position="sticky">
      {menus.map((menu) => (
        <Stack as="ul" listStyleType="none" spacing={4} justifyContent="flex-start" alignItems="flex-start">
          <Text fontSize="xs" fontWeight="bold" color="gray.500">
            {menu.title.toUpperCase()}
          </Text>
          {menu.items.map(({ title, href }) => (
            <LinkBox as="li" bg={active === href ? activeColor : ""} borderRadius="md" width="full" px={2} py={1}>
              <Link href={`/dashboard/${href}`}>
                <LinkOverlay href="#">{title}</LinkOverlay>
              </Link>
            </LinkBox>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}
