import { Container, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Avatar } from "./Avatar";

/**
 *
 * @param {string || string[]} img url to the img-ressource of the header avtar
 * @param {string} title heading of this page
 * @param {Link[]} link quick links of this page
 * @returns
 */
function QuickLinks({ img, title, link }) {
  //TODO: remember user data in localstorage
  return (
    <Stack direction="row" justify="space-between" alignItems="center" spacing={4} borderRadius="md" role="group">
      <Stack direction="row" alignItems="center" spacing={4}>
        <Avatar img={img} />
        <Flex direction="column">
          <Text fontSize="sm" color="gray.500" isTruncated>
            {title}
          </Text>
          {link}
        </Flex>
      </Stack>
    </Stack>
  );
}

export function PrivatePageHeader({ title, subtitle, img, quickLinksTitle, link, containerProps }) {
  return (
    <Container py={8} px={0} maxW="container.xl" borderBottomWidth={2} {...containerProps}>
      <Flex direction={{ base: "column-reverse", md: "row" }} justify="space-between" align={{ base: "start", md: "center" }}>
        <Stack spacing={2}>
          <Heading align="start" as="h1" fontSize="5xl" fontWeight="black" mt={{ base: 4, md: 0 }} isTruncated>
            {title}
          </Heading>
          {subtitle && <Text color="gray.500">{subtitle}</Text>}
        </Stack>
        <QuickLinks title={quickLinksTitle} img={img} link={link} />
      </Flex>
    </Container>
  );
}
