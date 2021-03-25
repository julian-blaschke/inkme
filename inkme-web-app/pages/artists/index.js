import { useMemo, useRef, useState } from "react";
import { FormControl, FormHelperText } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Center, Container, Divider, Heading, Kbd } from "@chakra-ui/layout";
import { SearchIcon } from "@chakra-ui/icons";

import { Breadcrumbs } from "@/components/BreadCrumbs";
import { useKeyPressFocusInput } from "@/hooks/useKeyPress";
import { useDebouncedHandler } from "@/hooks/useDebouncedHandler";
import { List } from "@/components/List";
import { mapArtists } from "lib/utils/mappers";
import { useCollection } from "@/firebase/hooks";
import { ALL_ARTISTS } from "@/firebase/queries";

export default function Artists() {
  const [query, setQuery] = useState("");
  const handler = useDebouncedHandler((e) => setQuery(e.target.value), 1000);

  const artistsRef = useMemo(() => ALL_ARTISTS(query), [query]);
  const [artists, isFetching] = useCollection(artistsRef, "username");

  //TODO: make previous searches persistent
  const searchRef = useRef();
  useKeyPressFocusInput(searchRef);

  return (
    <Container px={8}>
      <Breadcrumbs></Breadcrumbs>
      <Heading>Artists & Shops</Heading>
      <FormControl py={8}>
        <InputGroup>
          <InputLeftElement children={<SearchIcon />}></InputLeftElement>
          <Input placeholder="type ahead..." autoCorrect="off" ref={searchRef} onChange={handler}></Input>
          <InputRightElement></InputRightElement>
        </InputGroup>
        <Center>
          <FormHelperText>
            press <Kbd>/</Kbd> to focus
          </FormHelperText>
        </Center>
      </FormControl>
      <Divider variant="dashed" />
      {<List title="artists" data={mapArtists(artists)} isLoading={isFetching}></List>}
    </Container>
  );
}
