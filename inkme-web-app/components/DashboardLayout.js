import { Flex, Container, Heading } from "@chakra-ui/layout";

import { Breadcrumbs } from "./BreadCrumbs";

export function DashboardLayout({ title, children }) {
  return (
    <Flex>
      <Container px="8">
        <Breadcrumbs></Breadcrumbs>
        <Heading as="h1">{title}</Heading>
        {children}
      </Container>
    </Flex>
  );
}
