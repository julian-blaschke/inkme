import { useEffect, useRef, useState } from "react";
import { FormControl, FormHelperText } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Center, Container, Divider, Heading, Kbd } from "@chakra-ui/layout";
import { SearchIcon } from "@chakra-ui/icons";

import { Breadcrumbs } from "@/components/BreadCrumbs";
import { useKeyPressFocusInput } from "@/hooks/useKeyPress";
import { useDebouncedHandler } from "@/hooks/useDebouncedHandler";
import { getArtists } from "@/firebase/queries";
import { List } from "@/components/List";
import { mapArtists } from "lib/utils/mappers";
import { CenteredSpinner } from "@/components/CenteredSpinner";

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getArtists()
      .then((a) => setArtists(a))
      .finally(() => setIsFetching(false));
  }, []);

  async function onChange(e) {
    const query = e.target.value;
    const artists = await getArtists(query);
    setArtists(artists);
    setIsFetching(false);
  }

  const handler = useDebouncedHandler(onChange, 1000);

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
          <Input
            placeholder="type ahead..."
            autoCapitalize={false}
            ref={searchRef}
            onChange={(e) => {
              setIsFetching(true);
              handler(e);
            }}
          ></Input>
          <InputRightElement></InputRightElement>
        </InputGroup>
        <Center>
          <FormHelperText>
            press <Kbd>/</Kbd> to focus
          </FormHelperText>
        </Center>
      </FormControl>
      <Divider variant="dashed" />
      {isFetching ? <CenteredSpinner /> : <List title="artists" data={mapArtists(artists)}></List>}
    </Container>
  );
}
