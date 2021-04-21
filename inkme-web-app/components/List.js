import { Box, Center, SimpleGrid, Text } from "@chakra-ui/layout";
import { useMemo } from "react";
import { CenteredSpinner } from "./CenteredSpinner";
import { ListItem } from "./ListItem";

export function List({ title, data, isLoading, emptyMessage, columns }) {
  return (
    <Box mt={8} id={title?.replace(/\s/g, "")}>
      <Text my={4} fontSize="sm" color="brand.500">
        {title}
      </Text>
      <SimpleGrid columns={{ base: 1, md: columns }} mt={2} spacing={6}>
        {isLoading ? (
          <CenteredSpinner />
        ) : data?.length > 0 ? (
          data.map((record, i) => <ListItem key={i} {...record}></ListItem>)
        ) : (
          <Center py={4}>
            <Text color="brand.500" fontSize="sm">
              {emptyMessage || "list is empty 🤷."}
            </Text>
          </Center>
        )}
      </SimpleGrid>
    </Box>
  );
}

export function TwoListLayout({ children, listsAreOfEqualLength }) {
  return (
    <SimpleGrid columns={{ base: 1, md: listsAreOfEqualLength ? 2 : 1 }} spacing={6}>
      {children}
    </SimpleGrid>
  );
}
