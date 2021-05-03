import { Box, Container, Flex, Heading, Link, SimpleGrid, Text } from "@chakra-ui/layout";

export function GridLayout({ children, columns = 2, containerProps = {} }) {
  return (
    <SimpleGrid
      py={{ base: 0, md: 8 }}
      columns={{ base: 1, md: columns > 1 ? 2 : 1 }}
      gridTemplateColumns={{ md: columns > 1 ? "1fr 1fr" : "1fr" }}
      {...containerProps}
      rowGap={40}
    >
      {children}
    </SimpleGrid>
  );
}

export function GridLayoutItem({ children, title, subtitle, id, rightItem, containerProps }) {
  return (
    <Flex flexDir="column" as="section" id={id} px={{ sm: 4, md: 12, lg: 20 }} pt={24} mt={-24} id={id} {...containerProps}>
      <Flex
        flexDir={{ base: "column", sm: "row" }}
        justify={{ sm: "space-between" }}
        align={{ base: "start", sm: "center" }}
        borderBottomWidth={title && 1}
        pb={title && 4}
      >
        <Flex flexDir="column" pr={4}>
          <Flex alignItems="center" className="anchor">
            {id && (
              <Link href={"#".concat(id)} display={{ base: "none", md: "inline-block" }}>
                🔗
              </Link>
            )}
            {title && (
              <Heading fontSize="2xl" fontWeight="black">
                {title}
              </Heading>
            )}
          </Flex>
          {subtitle && (
            <Text color="gray.500" fontSize="sm">
              {subtitle}
            </Text>
          )}
        </Flex>
        {rightItem}
      </Flex>
      {children}
    </Flex>
  );
}
