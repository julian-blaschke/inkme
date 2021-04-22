import { Container, Heading, Stack, Text } from "@chakra-ui/layout";
import { Breadcrumbs } from "./BreadCrumbs";

export function DashboardLayout({ title, subtitle, menu, children, width }) {
  return (
    <>
      <Container direction="column" px="8" py="8" width={{ ...width }}>
        <Breadcrumbs></Breadcrumbs>
        <Stack isInline align="center" spacing={4}>
          <Heading as="h1">{title}</Heading>
          {menu}
        </Stack>
        <Text fontSize="sm" color="gray" noOfLines={2} pr={8} mb={12}>
          {subtitle}
        </Text>
        {children}
      </Container>
    </>
  );
}
