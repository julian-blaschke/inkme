import { primaryColorScheme } from "@/styles/theme";
import { Box, Button, Center, Container, Flex, Grid, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import { Sailor } from "public/Sailor";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preload" href="/fonts/SailorScrawlRegular-86Y0.ttf" as="font" crossOrigin="" />
      </Head>
      <Grid px={16} mt={8} templateColumns={{ base: "auto", lg: "auto 30vw" }} alignItems="center">
        <Center>
          <Sailor />
        </Center>
        <Flex flexDir="column">
          <Text fontSize="5xl" fontWeight="bold" align="center">
            Tattoos ahead!
          </Text>
          <Text align="center">Check out tattoo artists, shops & current guestspots!</Text>
          <Stack mt={16} isInline justifyContent="space-evenly">
            <Button>Check out artists</Button>
            <Button colorScheme="brand">Sign up as artist</Button>
          </Stack>
        </Flex>
      </Grid>
    </>
  );
}
