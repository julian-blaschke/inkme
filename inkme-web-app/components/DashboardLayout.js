import { Flex, Container, Heading, Stack, Text } from "@chakra-ui/layout";

import { Breadcrumbs } from "./BreadCrumbs";

export function DashboardLayout({ title, subtitle, menu, children }) {
  return (
    <Flex>
      <Container px="8">
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
    </Flex>
  );
}
