import { Box, Container, SimpleGrid, Text } from "@chakra-ui/layout";
import { GridLayoutItem } from "./GridLayout";

/**
 *
 * @param {List} children a list of links for the sidebar content
 * @returns {Box} fixed box that will be only shown on medium devices upwards
 */
function SideBar({ children, title }) {
  return (
    <Box position={{ md: "fixed" }} mt={{ base: 4, md: 12 }}>
      <Text fontSize="sm" fontWeight="medium" mb={6}>
        {title}
      </Text>
      <SimpleGrid px={{ md: 2 }} gap={{ base: 4, md: 2 }} columns={{ base: 2, md: 1 }} fontSize="xs">
        {children}
      </SimpleGrid>
    </Box>
  );
}

/**
 *
 * @param {PrivatePageHeader} header is the header component & will be placed in the grid layout the very first gridlayoutitem
 * @param {List} list is a list of links that will appear in the sidebar (for responsive layout under the header)
 * @param {GridLayoutItem[]} children a list of containers for the actual page-content
 * @returns {Container} responsive sidebar layout
 */
export function DashboardLayout({ header, linkList, children, sideBarTitle }) {
  return (
    <Container maxW="container.xl">
      <SimpleGrid columns={{ base: 1, md: 2 }} templateColumns={{ base: "1fr", md: "200px auto" }}>
        <GridLayoutItem containerProps={{ px: 4 }}>
          <SideBar title={sideBarTitle}>{linkList}</SideBar>
        </GridLayoutItem>
        <SimpleGrid columns={1} gap={16} mb={24} borderLeftWidth={{ md: 1 }}>
          <GridLayoutItem>{header}</GridLayoutItem>
          {children}
        </SimpleGrid>
      </SimpleGrid>
    </Container>
  );
}
