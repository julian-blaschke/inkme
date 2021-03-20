import NextLink from "next/link";
import { useEffect, useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Link, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Stack, useColorModeValue } from "@chakra-ui/react";

import DarkModeToggle from "./DarkModeToggle";
import { useAuth } from "@/hooks/useAuth";

export default function NavBar() {
  const [isOpen, toggle] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    toggle(false);
  }, []);

  const menuBg = useColorModeValue("white", "black");

  return (
    <Flex as="nav" py={4} pt={3} px={8} as="nav" align="center" justify="space-between" wrap="wrap">
      <NextLink href="/">
        <Link>Home</Link>
      </NextLink>
      <Flex align="center">
        <IconButton display={{ base: "block", md: "none" }} onClick={() => toggle((o) => !o)} icon={<HamburgerIcon />}></IconButton>
      </Flex>
      <Stack
        isInline
        spacing={{ base: "12" }}
        mt={{ base: "4", md: "0" }}
        width={{ base: "full", md: "auto" }}
        display={{ base: isOpen ? "flex" : "none", md: "flex" }}
        justifyContent={{ base: "space-between", sm: "space-evenly", md: "flex-end" }}
        alignItems="center"
        flexGrow={1}
      >
        <NextLink href="/artists">
          <Link display="block">artists</Link>
        </NextLink>
        <NextLink href="/blog">
          <Link display="block">blog</Link>
        </NextLink>
        {!user ? (
          <NextLink href="/sign-in">
            <Link display="block">sign in</Link>
          </NextLink>
        ) : (
          <Menu>
            <MenuButton>profile</MenuButton>
            <MenuList bg={menuBg}>
              <MenuGroup fontSize="xs" title="profile">
                <NextLink href="/profile/settings">
                  <MenuItem>settings</MenuItem>
                </NextLink>
                <NextLink href="/profile/security&privacy">
                  <MenuItem>security & privacy</MenuItem>
                </NextLink>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup fontSize="xs" title="shops & appointments">
                <NextLink href="/profile/shops">
                  <MenuItem>shops</MenuItem>
                </NextLink>
                <NextLink href="/profile/appointments">
                  <MenuItem>appointments</MenuItem>
                </NextLink>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup fontSize="xs" title="other">
                <NextLink href="/profile/messages">
                  <MenuItem>messages</MenuItem>
                </NextLink>
              </MenuGroup>
            </MenuList>
          </Menu>
        )}
        <DarkModeToggle />
      </Stack>
    </Flex>
  );
}
