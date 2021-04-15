import { DashboardLayout } from "@/components/DashboardLayout";
import { List } from "@/components/List";
import { useCollection } from "@/firebase/hooks";
import { ALL_ARTISTS, ALL_SHOPS } from "@/firebase/queries";
import { useDebouncedHandler } from "@/hooks/useDebouncedHandler";
import { useKeyPressFocusInput } from "@/hooks/useKeyPress";
import { FormControl } from "@chakra-ui/form-control";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Center, Divider, Flex, Grid, Kbd, Text } from "@chakra-ui/layout";
import { mapArtists, mapShops } from "lib/utils/mappers";
import { useMemo, useRef, useState } from "react";

export default function Artists() {
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
    <Grid templateColumns="50vw auto" height="max-content">
      <Center height="full" mt={12}>
        <Flex width="md">
          <DashboardLayout title="Find Artists & Shops">
            <Text color="gray" fontSize="sm">
              Just press <Kbd>/</Kbd> to focus the searchfield & type away...
            </Text>
            <FormControl py={8}>
              <InputGroup>
                <InputLeftElement children={<SearchIcon />}></InputLeftElement>
                <Input
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
            <Divider variant="dashed" />
            {
              <List
                data={[
                  ...(mapArtists(artists)?.map((a) => ({ ...a, subtitle: "Artist" })) || []),
                  ...(mapShops(shops)?.map((s) => ({ ...s, subtitle: "Shop" })) || []),
                ]}
                isLoading={artistsLoading || shopsLoading || isLoading}
                emptyMessage="no results found 📭."
              ></List>
            }
          </DashboardLayout>
        </Flex>
      </Center>
      {/* background image */}
      <div></div>
    </Grid>
  );
}
