import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  return (
    <Flex px={16} flexDir="column" justify="space-between" align="center" mt={8}>
      <Text fontSize="6xl" fontWeight="black" align="center">
        Tattoos Ahead!
      </Text>
      <Text color="gray.500" align="center">
        Welcome to ink.me, where tatoos live. Find tattoo artists, shops and check out upcoming guestspots.
      </Text>
      <Box mt={8}>
        <Image src="/sailor.svg" height={500} width={1000} color="" />
      </Box>
    </Flex>
  );
}
