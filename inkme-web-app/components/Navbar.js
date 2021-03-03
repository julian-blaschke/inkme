import NextLink from "next/link";
import { useEffect, useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Link, Stack } from "@chakra-ui/react";

import DarkModeToggle from "./DarkModeToggle";
import { useAuth } from "@/hooks/useAuth";

export default function NavBar() {
  const [isOpen, toggle] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    toggle(false);
  }, []);

  return (
    <Flex p={4} px={8} as="nav" align="center" justify="space-between" wrap="wrap" position="sticky">
      <NextLink href="/">
        <Link>Home</Link>
      </NextLink>
      <Flex align="center">
        <IconButton display={{ base: "block", md: "none" }} onClick={() => toggle((o) => !o)} icon={<HamburgerIcon />}></IconButton>
      </Flex>
      <Stack
        isInline
        spacing={{ md: "6", xl: "12" }}
        mt={{ base: "4", md: "0" }}
        width={{ base: "full", md: "auto" }}
        display={{ base: isOpen ? "flex" : "none", md: "flex" }}
        justifyContent={{ base: "space-evenly", md: "flex-end" }}
        alignItems="center"
        flexGrow={1}
      >
        <NextLink href="/artists">
          <Link display="block">artists</Link>
        </NextLink>
        <NextLink href="/blog">
          <Link display="block">blog</Link>
        </NextLink>
        {user ? (
          <NextLink href="/dashboard">
            <Link display="block">dashboard </Link>
          </NextLink>
        ) : (
          <NextLink href="/sign-in">
            <Link display="block">sign in</Link>
          </NextLink>
        )}
        <DarkModeToggle />
      </Stack>
    </Flex>
  );
}
