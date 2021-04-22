import { primaryColorScheme } from "@/styles/theme";
import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Container, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Breadcrumbs } from "./BreadCrumbs";

export function Header({ title, subtitle, img }) {
  return (
    <Container px={8} py={8} position="sticky">
      <Flex flexDirection={{ base: "column-reverse", sm: "row" }} justify="space-between" alignItems={{ base: "start", sm: "center" }}>
        <Flex flexDir="column">
          <Breadcrumbs></Breadcrumbs>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Heading as="h1" fontSize="5xl">
              {title}
            </Heading>
            <IconButton icon={<ChevronDownIcon />} size="sm" variant="ghost"></IconButton>
          </Stack>
          <Text fontSize="sm" color="gray" noOfLines={2} pr={8}>
            {subtitle}
          </Text>
        </Flex>
        {Array.isArray(img) ? (
          <AvatarGroup spacing={-6} border="none" bg="transparent" mb={{ base: 4, sm: 0 }}>
            {img.slice(0, 3).map((src, index) => (
              <Avatar key={index} borderRadius="md" bg="transparent" src={src}></Avatar>
            ))}
          </AvatarGroup>
        ) : (
          <Avatar borderRadius="md" src={img} mb={{ base: 4, sm: 0 }}></Avatar>
        )}
      </Flex>
    </Container>
  );
}
