import { Box, Center, Stack, Text } from "@chakra-ui/layout";
import { CenteredSpinner } from "./CenteredSpinner";
import { ListItem } from "./ListItem";

export function List({ title, data, isLoading, emptyMessage }) {
  return (
    <Box mt={8} id={title?.replace(/\s/g, "")}>
      <Text my={4} fontSize="sm" color="gray.500">
        {title}
      </Text>
      <Stack mt={2} spacing={6}>
        {isLoading ? (
          <CenteredSpinner />
        ) : data?.length > 0 ? (
          data.map((record, i) => <ListItem key={i} {...record}></ListItem>)
        ) : (
          <Center py={4}>
            <Text color="gray.500" fontSize="sm">
              {emptyMessage || "list is empty 🤷."}
            </Text>
          </Center>
        )}
      </Stack>
    </Box>
  );
}
