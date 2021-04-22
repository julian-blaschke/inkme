import { useAuth } from "@/hooks/useAuth";
import { useBackGroundColorValue } from "@/styles/theme";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Link, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import { AnchorIcon } from "public/icons/anchor";
import { useEffect, useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

export default function NavBar() {
  const [isOpen, toggle] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    toggle(false);
  }, []);

  const bg = useBackGroundColorValue();

  return (
    <Flex
      as="nav"
      py={2}
      px={8}
      align="center"
      justify="space-between"
      wrap="wrap"
      bg={bg}
      style={{ position: "-webkit -sticky", position: "sticky", top: 0, zIndex: 10 }}
    >
      <NextLink href="/home">
        <Link>
          <AnchorIcon />
        </Link>
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
            <MenuList bg={bg}>
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
                <NextLink href="/profile/invites">
                  <MenuItem>invites</MenuItem>
                </NextLink>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup fontSize="xs" title="other">
                <MenuItem onClick={signOut}>sign out</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        )}
        <DarkModeToggle />
      </Stack>
    </Flex>
  );
}
