import { Container, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import Link from "next/link";
import { Avatar } from "./Avatar";

function FloatingProfileCard({ link }) {
  //TODO: remember user data in localstorage
  return (
    <Stack direction="row" justify="space-between" alignItems="center" spacing={4} borderRadius="md" role="group">
      <Stack direction="row" alignItems="center" spacing={4}>
        <Avatar img="https://images.unsplash.com/photo-1601247117270-34005ffcf105?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" />
        <Flex direction="column">
          <Text fontSize="sm" color="bg.500" isTruncated>
            Your Profile
          </Text>
          {link}
        </Flex>
      </Stack>
    </Stack>
  );
}

export function PrivatePageHeader({ title, subtitle, link, containerProps }) {
  return (
    <Container py={8} px={0} maxW="container.xl" borderBottomWidth={1} {...containerProps}>
      <Flex direction={{ base: "column-reverse", md: "row" }} justify="space-between" align={{ base: "start", md: "center" }}>
        <Stack spacing={2}>
          <Heading align="start" as="h1" fontSize="5xl" fontWeight="black" mt={{ base: 4, md: 0 }}>
            {title}
          </Heading>
          {subtitle && <Text color="bg.500">{subtitle}</Text>}
        </Stack>
        <FloatingProfileCard link={link} />
      </Flex>
    </Container>
  );
}
