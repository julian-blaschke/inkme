import { useEffect, useRef, useState } from "react";
import { FormControl, FormHelperText } from "@chakra-ui/form-control";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Center, Container, Divider, Heading, Kbd, Stack, Text } from "@chakra-ui/layout";

import { Breadcrumbs } from "@/components/BreadCrumbs";
import { SearchResult } from "@/components/SearchResult";
import { useKeyPress, useKeyPressFocusInput } from "@/hooks/useKeyPress";

const mockdata = [
  {
    title: "hotgirltatooo",
    subtitle: "owner at happyneedles",
    img: "https://news.berkeley.edu/wp-content/uploads/2019/02/JamesFrancoSmile300.jpg",
    url: "/artists/hotgirltattoo",
  },
  {
    title: "handpoke-princess",
    subtitle: "appreantce at permanent regret",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGuA0vvPAwFOnfVF_zRX_nbqisR_VO_XMtvg&usqp=CAU",
    url: "/artists/handpoke-princess",
  },
  {
    title: "handpoke-princess",
    subtitle: "appreantce at permanent regret",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGuA0vvPAwFOnfVF_zRX_nbqisR_VO_XMtvg&usqp=CAU",
    url: "/artists/handpoke-princess",
  },
];

export default function Artists() {
  const searchRef = useRef();
  useKeyPressFocusInput(searchRef);

  const [focused, setFocused] = useState(-1);
  const isArrowDown = useKeyPress("ArrowDown");

  useEffect(() => {
    if (isArrowDown) {
      setFocused((f) => {
        if (f === mockdata.length - 1) return 0;
        return ++f;
      });
    }
  }, [isArrowDown]);

  return (
    <>
      <Container px={8}>
        <Breadcrumbs></Breadcrumbs>
        <Heading>Artists & Shops</Heading>
        <FormControl py={8}>
          <InputGroup>
            <InputLeftElement children={<SearchIcon />}></InputLeftElement>
            <Input placeholder="type ahead..." autoCapitalize="false" ref={searchRef}></Input>
            <InputRightElement></InputRightElement>
          </InputGroup>
          <Center>
            <FormHelperText>
              press <Kbd>/</Kbd> to focus
            </FormHelperText>
          </Center>
        </FormControl>
        <Divider />
        <Text mt={4} fontSize="sm" color="gray.500">
          Artists
        </Text>
        <Stack mt={2} spacing={4}>
          {mockdata.map((mock, i) => (
            <SearchResult {...mock} isFocused={i === focused} key={i}></SearchResult>
          ))}
        </Stack>
      </Container>
    </>
  );
}
