import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Container, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Avatar } from "./Avatar";
import { Breadcrumbs } from "./BreadCrumbs";

export function Header({ title, subtitle, img }) {
  return (
    <Container px={8} py={8}>
      <Flex flexDirection={{ base: "column-reverse", sm: "row" }} justify="space-between" alignItems={{ base: "start", sm: "center" }}>
        <Flex flexDir="column">
          <Breadcrumbs></Breadcrumbs>
          <Stack direction="row" align="center" spacing={4}>
            <Heading as="h1" fontSize="5xl" fontWeight="black">
              {title}
            </Heading>
            <IconButton icon={<ChevronDownIcon />} size="sm" variant="ghost"></IconButton>
          </Stack>
          <Text fontSize="sm" color="gray" noOfLines={2} pr={8}>
            {subtitle}
          </Text>
        </Flex>
        <Avatar img={img} />
      </Flex>
    </Container>
  );
}
