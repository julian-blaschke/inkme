import { ImageLayout } from "@/components/layout/ImageLayout";
import { primaryColorScheme } from "@/styles/theme";
import { Button, Center, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  return (
    <ImageLayout img="/rubberman.png">
      <Center mt={{ base: 0, md: 12 }} flexDir="column" maxW="container.sm">
        <Text fontSize="6xl" fontWeight="black" align="center">
          Where Tattoos live
        </Text>
        <Text color="bg.500" align="center">
          Track where your favourite artists are currently working at & travelling to. Check out current guestSpots in your area.
        </Text>
        <Stack mt={12} isInline spacing={8}>
          <Button colorScheme={primaryColorScheme}>check out artists</Button>
          <Button colorScheme={primaryColorScheme} variant="outline">
            sign up as artist
          </Button>
        </Stack>
      </Center>
    </ImageLayout>
  );
}
