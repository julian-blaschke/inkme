import { Breadcrumbs } from "@/components/BreadCrumbs";
import { List } from "@/components/List";
import { admin } from "@/firebase/admin";
import { primaryColorScheme } from "@/styles/usePrimaryColor";
import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Container, Divider, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/layout";
import { mapFirestoreCol, mapFirestoreDoc } from "lib/utils/helpers";
import { mapPublicGuestSpots, mapShops } from "lib/utils/mappers";
import { useMemo } from "react";

function Header({ username, bio, img }) {
  return (
    <Container px={8} py={8} position="sticky">
      <Flex flexDirection="row" justify="space-between" alignItems="center">
        <Flex flexDir="column">
          <Breadcrumbs></Breadcrumbs>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Heading as="h1">{username}</Heading>
            <IconButton icon={<ChevronDownIcon />} size="sm" variant="ghost"></IconButton>
          </Stack>
          <Text fontSize="sm" color="gray" noOfLines={2} pr={8}>
            {bio}
          </Text>
        </Flex>
        <Avatar src={img} borderRadius="md" colorScheme={primaryColorScheme} />
      </Flex>
    </Container>
  );
}

function MainContent({ shops, guestSpots }) {
  const listsAreOfEqualLength = useMemo(() => shops?.length === guestSpots?.length, [shops, guestSpots]);
  return (
    <Container px={8}>
      <SimpleGrid columns={listsAreOfEqualLength ? 2 : 1} spacing={6}>
        <List title="currently works at" columns={listsAreOfEqualLength ? 1 : 2} data={mapShops(shops)}></List>
        <List title="current guestspots" columns={listsAreOfEqualLength ? 1 : 2} data={mapPublicGuestSpots(guestSpots)}></List>
      </SimpleGrid>
    </Container>
  );
}

export default function Artist({ artist, shops, guestSpots }) {
  return (
    <>
      <Header {...artist} />
      <Divider py={4} variant="dashed" />
      <MainContent {...{ shops, guestSpots }} />
    </>
  );
}

export async function getStaticProps(context) {
  // TODO: maybe replace with queries stored in the firebase directory & make error handling robust
  try {
    const { username } = context.params;
    const db = admin.firestore();

    const artistDoc = db.collection("artists").doc(username);
    const artistRaw = await artistDoc.get();
    const artist = mapFirestoreDoc(artistRaw, "username");

    const shopsCol = db.collection("shops").where("artists", "array-contains", username);
    const shopsRaw = await shopsCol.get();
    const shops = mapFirestoreCol(shopsRaw, "name");

    const guestSpotsCol = db.collectionGroup("guestspots").where("artist", "==", username);
    const guestSpotsRaw = await guestSpotsCol.get();
    const guestSpotsWithFirestoreDates = mapFirestoreCol(guestSpotsRaw);
    const guestSpots = guestSpotsWithFirestoreDates.map((guestspot) => {
      guestspot.range.from = guestspot.range.from.toDate().toString();
      guestspot.range.to = guestspot.range.to.toDate().toString();
      guestspot.created = guestspot.created.toDate().toString();
      return guestspot;
    });

    return { props: { artist, shops, guestSpots } };
  } catch ({ message }) {
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
