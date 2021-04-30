import { Box, Container, SimpleGrid } from "@chakra-ui/layout";
import { GridLayoutItem } from "./GridLayout";

/**
 *
 * @param {List} children a list of links for the sidebar content
 * @returns {Box} fixed box that will be only shown on medium devices upwards
 */
function SideBar({ children }) {
  return (
    <Box position={{ md: "fixed" }}>
      <SimpleGrid gap={{ base: 4, md: 8 }} columns={{ base: 2, md: 1 }} mt={{ base: 4, md: 12 }} fontSize="sm">
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
export function DashboardLayout({ header, linkList, children }) {
  return (
    <Container maxW="container.xl">
      <SimpleGrid columns={{ base: 1, md: 2 }} templateColumns={{ base: "1fr", md: "240px auto" }}>
        <GridLayoutItem>
          <SideBar>{linkList}</SideBar>
        </GridLayoutItem>
        <SimpleGrid columns={1} gap={16} mb={24} borderLeftWidth={{ md: 1 }}>
          <GridLayoutItem>{header}</GridLayoutItem>
          {children}
        </SimpleGrid>
      </SimpleGrid>
    </Container>
  );
}