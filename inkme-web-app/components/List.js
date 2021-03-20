import { Box, Center, Stack, Text } from "@chakra-ui/layout";
import { ListItem } from "./ListItem";

export function List({ data, title }) {
  return (
    <Box mt={8}>
      <Text my={4} fontSize="sm" color="gray.500">
        {title}
      </Text>
      <Stack mt={2} spacing={6}>
        {data?.length > 0 ? (
          data.map((record, i) => <ListItem key={i} {...record}></ListItem>)
        ) : (
          <Center py={4}>
            <Text color="gray.500" fontSize="sm">
              empty list.
            </Text>
          </Center>
        )}
      </Stack>
    </Box>
  );
}
