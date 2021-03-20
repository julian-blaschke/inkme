import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

export function CenteredSpinner() {
  return (
    <Center py={4}>
      <Spinner color="blue.500" />
    </Center>
  );
}
