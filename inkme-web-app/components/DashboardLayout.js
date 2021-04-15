import { Box, Container, Flex, Grid, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Breadcrumbs } from "./BreadCrumbs";
import { DashboardSideBar } from "./DashboardSideBar";

export function DashboardLayout({ title, subtitle, menu, children }) {
  return (
    <Container direction="column" px="8" py="8">
      <Breadcrumbs></Breadcrumbs>
      <Stack isInline align="center" spacing={4}>
        <Heading as="h1">{title}</Heading>
        {menu}
      </Stack>
      <Text fontSize="sm" color="gray" noOfLines={2} pr={8}>
        {subtitle}
      </Text>
      {children}
    </Container>
  );
}
