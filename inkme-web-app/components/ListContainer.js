import { List, Text } from "@chakra-ui/layout";

export function ListContainer({ title, children }) {
  return (
    <List display="flex" flexDirection="column">
      <Text fontSize="sm" color="gray.500">
        {title}
      </Text>
      <List mt={4} spacing={4} listStyleType="none">
        {children}
      </List>
    </List>
  );
}
