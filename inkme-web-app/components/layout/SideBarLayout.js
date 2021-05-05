import { Box, Container, Flex, Link, SimpleGrid, Stack } from "@chakra-ui/layout";
import DarkModeToggle from "../DarkModeToggle";
import { GithubButton } from "../GithubButton";

/**
 *
 * @param {Array<object>} links array of objects of type {title: string, href: string}
 * @param {string} header header for this component
 * @returns {Fragment} fragment with heading & stack of links
 */
function RightSidebarLinkStack({ links }) {
  const { title, href, sublinks } = links;
  return (
    <Box>
      <Link href={href} fontSize="lg" fontWeight="medium" children={title} />
      <Stack mt={2} px={2} spacing={0} fontSize="sm">
        {sublinks.map((link) => (
          <Link href={link.href} children={link.title} />
        ))}
      </Stack>
    </Box>
  );
}

/**
 *
 * @returns {Box} fixed Component
 */
function RightSideBar({ links }) {
  return (
    <Flex justify="center">
      <Stack position={{ md: "fixed" }} px={4} height="100vh" justify="space-between" py={12} overflow="scroll">
        <Stack spacing={8}>
          {links.map((l) => (
            <RightSidebarLinkStack links={l} />
          ))}
        </Stack>
        <Stack isInline justify="start" pt={8}>
          <GithubButton />
          <DarkModeToggle />
        </Stack>
      </Stack>
    </Flex>
  );
}

const defaultLinks = [
  {
    title: "Inked.me",
    href: "/",
    sublinks: [
      { href: "/about", title: "About" },
      { href: "/blog", title: "Blog" },
    ],
  },
  {
    title: "Dashboard",
    href: "/me",
    sublinks: [
      { href: "/me#shops", title: "Shops" },
      { href: "/me#guestspots", title: "Guest spots" },
      { href: "/me#invites", title: "Invitations" },
    ],
  },
  {
    title: "Settings",
    href: "/settings",
    sublinks: [
      { href: "/settings#profile", title: "Profile" },
      { href: "/settings#security", title: "Security & Privacy" },
      { href: "/settings#account", title: "Account" },
      { href: "/settings#appearance", title: "Appearance" },
    ],
  },
  {
    title: "Account",
    href: "",
    sublinks: [{ href: "/signout", title: "Sign out" }, {}],
  },
];

/**
 * layout for pages that have a sidebar with page links
 *
 * @returns
 */
export function SideBarLayout({ links, children }) {
  return (
    <Container maxW="container.xl">
      <SimpleGrid columns={{ base: 1, md: 2 }} templateColumns={{ base: "1fr", md: "150px auto" }}>
        <RightSideBar links={Array.isArray(links) ? [...links, ...defaultLinks] : defaultLinks} />
        <SimpleGrid py={12} columns={1} gap={20}>
          {children}
        </SimpleGrid>
      </SimpleGrid>
    </Container>
  );
}
