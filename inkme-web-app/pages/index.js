import { DashboardLayout } from "@/components/DashboardLayout";
import { List, TwoListLayout } from "@/components/List";
import { useCollection } from "@/firebase/hooks";
import { ALL_ARTISTS, ALL_SHOPS } from "@/firebase/queries";
import { useDebouncedHandler } from "@/hooks/useDebouncedHandler";
import { useKeyPressFocusInput } from "@/hooks/useKeyPress";
import { FormControl } from "@chakra-ui/form-control";
import { SearchIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Center, Container, Divider, Flex, Grid, Heading, Kbd, SimpleGrid, Text } from "@chakra-ui/layout";
import { mapArtists, mapPublicShops, mapShops } from "lib/utils/mappers";
import { useMemo, useRef, useState } from "react";

function SearchSection() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handler = useDebouncedHandler((e) => {
    setQuery(e.target.value);
    setIsLoading(false);
  }, 1000);

  const artistsRef = useMemo(() => ALL_ARTISTS(query), [query]);
  const [artists, artistsLoading] = useCollection(artistsRef, "username", false);
  console.log(artists);

  const shopsRef = useMemo(() => ALL_SHOPS(query), [query]);
  const [shops, shopsLoading] = useCollection(shopsRef, "name", false);

  //TODO: make previous searches persistent
  const searchRef = useRef();
  useKeyPressFocusInput(searchRef);

  return (
    <Container maxW={{ md: "md" }} p={8}>
      <Heading as="h2" fontSize="5xl" fontWeight="black">
        Search
      </Heading>
      <Text>
        Search for Artists & Shops. Just press <Kbd>/</Kbd> to focus the searchfield & type away...
      </Text>
      <FormControl mt={12}>
        <InputGroup>
          <InputLeftElement children={<SearchIcon />}></InputLeftElement>
          <Input
            name="search"
            placeholder="type ahead..."
            autoCorrect="off"
            ref={searchRef}
            onChange={(e) => {
              setIsLoading(true);
              handler(e);
            }}
          ></Input>
          <InputRightElement></InputRightElement>
        </InputGroup>
      </FormControl>
      <List
        title="results"
        data={[
          ...(mapArtists(artists)?.map((a) => ({ ...a, subtitle: "Artist" })) || []),
          ...(mapPublicShops(shops)?.map((s) => ({ ...s, subtitle: "Shop" })) || []),
        ]}
        isLoading={artistsLoading || shopsLoading || isLoading}
      ></List>
    </Container>
  );
}

function DiscoverSection() {
  return (
    <Container p={8} maxW={{ md: "container.md" }}>
      <Heading as="h2" fontSize="5xl" fontWeight="black">
        Discover
      </Heading>
      <Text maxW="md">Discover Artists & Shops near your location. Check out guestspots that are comming to your city.</Text>
      <TwoListLayout listsAreOfEqualLength>
        <List title="artists & shops near you"></List>
        <List title="guestspots near you"></List>
      </TwoListLayout>
      <Divider py={8} />
      <TwoListLayout listsAreOfEqualLength>
        <List title="suggested spots"></List>
        <List title="sponsored spots"></List>
      </TwoListLayout>
    </Container>
  );
}

export default function Artists() {
  //can't use custom component for layout, as this page has fixed height settings
  return (
    <>
      {/*<Image src="/scribbles/2linescurved.png" position="absolute" mr="auto" right={0} zIndex="-1" opacity="0.1" height="calc(100vh - 56px)" />*/}
      <SimpleGrid columns={{ base: 1, md: 2 }} gridTemplateColumns={{ md: "1fr 1fr" }} gap={{ base: 12, md: 0 }} minHeight={`calc(100vh - 56px)`}>
        <SearchSection />
        <Divider display={{ base: "inline-block", md: "none" }} />
        <DiscoverSection />
      </SimpleGrid>
    </>
  );
}
