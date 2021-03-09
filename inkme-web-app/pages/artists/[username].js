import { Breadcrumbs } from "@/components/BreadCrumbs";
import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Container, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

import { admin } from "@/firebase/admin";
import { ListItem } from "@/components/ListItem";
import { ListContainer } from "@/components/ListContainer";
import { useRouter } from "next/router";
import { Progress } from "@chakra-ui/progress";

const mockdata = [
  {
    title: "hyperhumanttt",
    subtitle: "owner since 1997",
    img: "https://news.berkeley.edu/wp-content/uploads/2019/02/JamesFrancoSmile300.jpg",
    url: "/artists/julian",
  },
  {
    title: "permanent regret",
    subtitle: "appreantice since 2009",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGuA0vvPAwFOnfVF_zRX_nbqisR_VO_XMtvg&usqp=CAU",
    url: "/artists/handpoke-princess",
  },
];

export default function Artist({ artist }) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <Progress size="xs" colorScheme="pink" isIndeterminate />;
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
          <Text fontSize="sm" color="gray.500">
            {artist?.bio || "this is my bio."}
          </Text>
        </Flex>
        <Image src="https://news.berkeley.edu/wp-content/uploads/2019/02/JamesFrancoSmile300.jpg" height="14" width="14" borderRadius="100%"></Image>
      </Flex>
      <Divider my={8} />
      <Stack spacing={12}>
        <ListContainer title="Working at">
          {mockdata.map((data) => (
            <ListItem
              {...data}
              key={data.title}
              rightItem={
                <Text fontSize="xs" color="gray.500">
                  owner
                </Text>
              }
            />
          ))}
        </ListContainer>
        <ListContainer title="Upcoming Guest Spots">
          {mockdata.map((data) => (
            <ListItem
              {...data}
              key={data.title}
              rightItem={
                <Stack>
                  <Text fontSize="xs" color="gray.500">
                    24. Jan, 2021
                  </Text>
                </Stack>
              }
            />
          ))}
        </ListContainer>
        <ListContainer title="Posts via Instagram"></ListContainer>
      </Stack>
    </Container>
  );
}

export async function getStaticProps(context) {
  const { username } = context.params;

  const doc = admin.firestore().collection("artists").doc(username);
  const artist = await doc.get();

  if (!artist.exists) return { notFound: true };
  return { props: { artist: { ...artist.data(), username: doc.id } } };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
