import { Section } from "@/components/layout/Section";
import { SideBarLayout } from "@/components/layout/SideBarLayout";
import { List } from "@/components/List";
import { useCollection } from "@/firebase/hooks";
import { ALL_ARTISTS, ALL_SHOPS } from "@/firebase/queries";
import { useDebouncedHandler } from "@/hooks/useDebouncedHandler";
import { useKeyPressFocusInput } from "@/hooks/useKeyPress";
import { FormControl } from "@chakra-ui/form-control";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Divider, SimpleGrid } from "@chakra-ui/layout";
import { mapArtists, mapPublicShops } from "lib/utils/mappers";
import { useMemo, useRef, useState } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handler = useDebouncedHandler((e) => {
    setQuery(e.target.value);
    setIsLoading(false);
  }, 1000);

  const artistsRef = useMemo(() => ALL_ARTISTS(query), [query]);
  const [artists, artistsLoading] = useCollection(artistsRef, "username", false);

  const shopsRef = useMemo(() => ALL_SHOPS(query), [query]);
  const [shops, shopsLoading] = useCollection(shopsRef, "name", false);

  //TODO: make previous searches persistent
  const searchRef = useRef();
  useKeyPressFocusInput(searchRef);

  return (
    <>
      <FormControl>
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
        maxCols={1}
        title="results"
        data={[
          ...(mapArtists(artists)?.map((a) => ({ ...a, subtitle: "Artist" })) || []),
          ...(mapPublicShops(shops)?.map((s) => ({ ...s, subtitle: "Shop" })) || []),
        ]}
        isLoading={artistsLoading || shopsLoading || isLoading}
      ></List>
    </>
  );
}

function Discover() {
  return (
    <>
      <List title="artists & shops near you"></List>
      <List title="guestspots near you"></List>
      <Divider py={8} />
      <List title="suggested spots"></List>
      <List title="sponsored spots"></List>
    </>
  );
}

export default function Artists() {
  return (
    <SideBarLayout>
      <Section title="Inked.me" variant="h1" />
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <Section id="search" title="Search" subtitle="Search for Artists & Shops by their name." children={<Search />} />
        <Section
          id="discover"
          title="Discover"
          subtitle="Discover Artists & Shops near your location. Check out guestspots that are comming to your city."
          children={<Discover />}
        />
      </SimpleGrid>
    </SideBarLayout>
  );
}
