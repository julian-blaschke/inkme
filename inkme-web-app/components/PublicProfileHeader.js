import { primaryColorScheme } from "@/styles/theme";
import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Container, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Breadcrumbs } from "./BreadCrumbs";

export function Header({ title, subtitle, avatar }) {
  return (
    <Container px={8} py={8} position="sticky">
      <Flex flexDirection="row" justify="space-between" alignItems="center">
        <Flex flexDir="column">
          <Breadcrumbs></Breadcrumbs>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Heading as="h1">{title}</Heading>
            <IconButton icon={<ChevronDownIcon />} size="sm" variant="ghost"></IconButton>
          </Stack>
          <Text fontSize="sm" color="gray" noOfLines={2} pr={8}>
            {subtitle}
          </Text>
        </Flex>
        <Avatar src={avatar} borderRadius="md" colorScheme={primaryColorScheme} />
      </Flex>
    </Container>
  );
}
