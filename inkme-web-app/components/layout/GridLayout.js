import { Container, Link, SimpleGrid, Text } from "@chakra-ui/layout";

export function GridLayout({ children, columns = 2, containerProps = {} }) {
  return (
    <SimpleGrid
      py={{ base: 0, md: 8 }}
      columns={{ base: 1, md: columns > 1 ? 2 : 1 }}
      gridTemplateColumns={{ md: columns > 1 ? "1fr 1fr" : "1fr" }}
      {...containerProps}
    >
      {children}
    </SimpleGrid>
  );
}

export function GridLayoutItem({ children, title, subtitle, id, containerProps }) {
  return (
    <Container maxW={{ base: "lg", xl: "container.md" }} pt={24} mt={-24} id={id} {...containerProps}>
      <Link href={`#${id}`} fontSize="2xl" fontWeight="black" className={title && "link"}>
        {title}
      </Link>
      {subtitle && (
        <Text color="bg.500" fontSize="sm">
          {subtitle}
        </Text>
      )}
      {children}
    </Container>
  );
}
