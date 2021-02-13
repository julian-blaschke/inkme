import NextLink from "next/link";
import { useEffect, useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Link, Stack } from "@chakra-ui/react";

import DarkModeToggle from "./DarkModeToggle";

const NavBar = () => {
  const [isOpen, toggle] = useState(false);

  useEffect(() => {
    toggle(false);
  }, []);

  return (
    <Flex
      p={4}
      pl={4}
      pr={4}
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
    >
      <NextLink href="/">
        <Link>Home</Link>
      </NextLink>
      <Flex align="center">
        <IconButton
          display={{ base: "block", md: "none" }}
          onClick={() => toggle((o) => !o)}
          icon={<HamburgerIcon />}
        ></IconButton>
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
        <NextLink href="/sign-in">
          <Link display="block">account</Link>
        </NextLink>
        <NextLink href="/artists">
          <Link display="block">artists</Link>
        </NextLink>
        <NextLink href="/shops">
          <Link display="block">shops</Link>
        </NextLink>
        <NextLink href="/blog">
          <Link display="block">blog</Link>
        </NextLink>
        <DarkModeToggle />
      </Stack>
    </Flex>
  );
};

export default NavBar;
