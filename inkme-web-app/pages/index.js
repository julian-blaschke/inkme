import { Container, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container px="8">
      <Heading bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text" fontSize="6xl" fontWeight="extrabold">
        Where Tattoos live...
      </Heading>
      <Text color="gray.500">Welcome to inkme! check out tattoo artists, where they are working at & book appointments.</Text>
    </Container>
  );
}
