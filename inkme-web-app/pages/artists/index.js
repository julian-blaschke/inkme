import { useMemo, useRef, useState } from "react";
import { FormControl, FormHelperText } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Center, Container, Divider, Heading, Kbd, Text } from "@chakra-ui/layout";
import { SearchIcon } from "@chakra-ui/icons";

import { Breadcrumbs } from "@/components/BreadCrumbs";
import { useKeyPressFocusInput } from "@/hooks/useKeyPress";
import { useDebouncedHandler } from "@/hooks/useDebouncedHandler";
import { List } from "@/components/List";
import { mapArtists, mapShops } from "lib/utils/mappers";
import { useCollection } from "@/firebase/hooks";
import { ALL_ARTISTS, ALL_SHOPS } from "@/firebase/queries";

export default function Artists() {
  const [query, setQuery] = useState("");
  const handler = useDebouncedHandler((e) => setQuery(e.target.value), 1000);

  const artistsRef = useMemo(() => ALL_ARTISTS(query), [query]);
  const [artists, artistsLoading] = useCollection(artistsRef, "username");

  const shopsRef = useMemo(() => ALL_SHOPS(query), [query]);
  const [shops, shopsLoading] = useCollection(shopsRef, "name");

  //TODO: make previous searches persistent
  const searchRef = useRef();
  useKeyPressFocusInput(searchRef);

  return (
    <Container px={8}>
      <Breadcrumbs></Breadcrumbs>
      <Heading>Find'em! 🕵️</Heading>
      <Text color="gray" fontSize="sm">
        Just press <Kbd>/</Kbd> to focus the searchfield & type away...
      </Text>
      <FormControl py={8}>
        <InputGroup>
          <InputLeftElement children={<SearchIcon />}></InputLeftElement>
          <Input placeholder="type ahead..." autoCorrect="off" focusBorderColor="pink.500" ref={searchRef} onChange={handler}></Input>
          <InputRightElement></InputRightElement>
        </InputGroup>
      </FormControl>
      <Divider variant="dashed" />
      <List title="artists" data={mapArtists(artists)} isLoading={artistsLoading}></List>
      <List title="shops" data={mapShops(shops)} isLoading={shopsLoading}></List>
    </Container>
  );
}
