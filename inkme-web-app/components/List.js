import { Center, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/layout";
import { CenteredSpinner } from "./CenteredSpinner";
import { ListItem } from "./ListItem";

export function List({ title, data, isLoading, emptyMessage, columns, gridProps }) {
  return (
    <Flex mt={8} id={title?.replace(/\s/g, "")} flexDir="column">
      <Heading as="h2" fontStyle="italic" fontWeight="black" my={4} fontSize="sm">
        {title}
      </Heading>
      <SimpleGrid mt={2} spacing={6} {...gridProps}>
        {isLoading ? (
          <CenteredSpinner />
        ) : data?.length > 0 ? (
          data.map((record, i) => <ListItem key={i} {...record}></ListItem>)
        ) : (
          <Center py={4}>
            <Text color="bg.500" fontSize="sm">
              {emptyMessage || ""}
            </Text>
          </Center>
        )}
      </SimpleGrid>
    </Flex>
  );
}

export function TwoListLayout({ children, listsAreOfEqualLength }) {
  return (
    <SimpleGrid columns={{ base: 1, md: listsAreOfEqualLength ? 2 : 1 }} spacing={6}>
      {children}
    </SimpleGrid>
  );
}
