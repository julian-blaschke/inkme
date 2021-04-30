import { useHoverColorValue } from "@/styles/theme";
import { Box, Flex, LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/layout";
import { AnchorIcon } from "public/icons/anchor";
import DarkModeToggle from "./DarkModeToggle";

function SideBarItem({ title, href, icon }) {
  return (
    <LinkBox py={2} px={6} as={Stack} spacing={2} isInline align="center" borderRadius="lg">
      {icon}
      <LinkOverlay href={href} display={{ base: "none", md: "inline-block" }}>
        {title}
      </LinkOverlay>
    </LinkBox>
  );
}

function SideBarHeader() {
  return <SideBarItem title={<Text fontWeight="black">Ink.me</Text>} icon={<AnchorIcon />} href="/dashboard" />;
}

export function DashboardSideBar() {
  return (
    <Box height={{ sm: "100vh" }} width={{ base: "100vw", sm: "auto" }} maxW={52} display={{ base: "none", sm: "block" }}>
      <Box height="full" py={4} px={2} borderRightWidth={1} bottom={{ base: 0 }}>
        <Flex flexDir="column" height="full" align="start" justify="space-between">
          <SideBarHeader />
          <SideBarItem icon={<DarkModeToggle />}></SideBarItem>
        </Flex>
      </Box>
    </Box>
  );
}
