import { ImageLayout } from "@/components/layout/ImageLayout";
import { primaryColorScheme } from "@/styles/theme";
import { Button, Center, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();
  return (
    <ImageLayout img="/home.png">
      <Center mt={{ base: 0, md: 12 }} flexDir="column" maxW="container.sm">
        <Text fontSize="6xl" fontWeight="black" align="center">
          Where Tattoos live
        </Text>
        <Text color="bg.500" align="center">
          Track where your favourite artists are currently working at & travelling to. Check out current guestSpots in your area.
        </Text>
        <Stack mt={12} isInline spacing={8}>
          <Button colorScheme={primaryColorScheme} onClick={() => push("/")}>
            check out artists
          </Button>
          <Button colorScheme={primaryColorScheme} onClick={() => push("/sign-up")} variant="outline">
            sign up as artist
          </Button>
        </Stack>
      </Center>
    </ImageLayout>
  );
}
