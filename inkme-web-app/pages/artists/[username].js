import { Breadcrumbs } from "@/components/BreadCrumbs";
import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Container, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import { Avatar } from "@chakra-ui/avatar";
import { useColorModeValue } from "@chakra-ui/color-mode";

import { admin } from "@/firebase/admin";
import { useRouter } from "next/router";
import { List } from "@/components/List";
import { mapShops } from "lib/utils/mappers";

export default function Artist({ artist }) {
  const router = useRouter();
  const avatar = useColorModeValue("gray.100", "gray.900");

  // If the page is not yet generated, this will be displayed initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <Progress size="xs" colorScheme="blue" isIndeterminate />;
  }

  return (
    <Container px={8} pb={8}>
      <Flex flexDirection="row" justify="space-between" alignItems="center">
        <Flex flexDir="column">
          <Breadcrumbs></Breadcrumbs>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Heading as="h1">{artist?.username}</Heading>
            <IconButton icon={<ChevronDownIcon />} size="sm" variant="ghost"></IconButton>
          </Stack>
          <Text fontSize="sm" color="gray.500" noOfLines={2} pr={8}>
            {artist?.bio || "this is my bio."}
          </Text>
        </Flex>
        <Avatar src={artist.photoURL} borderRadius="md" bg={avatar} />
      </Flex>
      <Divider py={8} variant="dashed" />
      <List title="shops" data={mapShops(artist.shops)}></List>
    </Container>
  );
}

export async function getStaticProps(context) {
  // TODO: maybe replace with queries stored in the firebase directory & make error handling robust
  const { username } = context.params;
  const db = admin.firestore();

  const doc = db.collection("artists").doc(username);
  const artist = await doc.get();

  if (!artist.exists) return { notFound: true };

  const docs = db.collection("shops").where("owner", "==", doc.id);
  const data = await docs.get();
  const shops = data.docs.map((d) => ({ ...d.data(), name: d.id }));

  return { props: { artist: { ...artist.data(), username: doc.id, shops } } };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
