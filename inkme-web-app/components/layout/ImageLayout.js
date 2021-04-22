import { Image } from "@chakra-ui/image";
import { Center, Flex, SimpleGrid } from "@chakra-ui/layout";

export function ImageLayout({ children, img }) {
  return (
    <SimpleGrid
      px={12}
      py={{ base: 2, md: 12 }}
      gap={16}
      columns={{ md: 2, xl: 3 }}
      templateColumns={{ md: "1fr 1fr", xl: "2 1fr" }}
      display={{ base: "flex", md: "grid" }}
      flexDir="column-reverse"
      alignItems={{ base: "center", md: "center" }}
      justifyContent={{ base: "space-evenly", md: "space-evenly" }}
      height={{ base: "auto", md: `calc(100vh - 56px)` }}
      minHeight={`calc(100vh - 56px)`}
    >
      <Center>
        <Image py={8} src={img} maxH={550} width={{ base: 200, md: "auto" }} align="center"></Image>
      </Center>
      <Flex justifyContent="center" alignItems="start" align="start">
        {children}
      </Flex>
    </SimpleGrid>
  );
}
