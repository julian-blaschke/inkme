import { ImageLayout } from "@/components/layout/ImageLayout";
import { Center, Flex, Link, Text } from "@chakra-ui/layout";
import NextLink from "next/link";

export default function notFound() {
  return (
    <ImageLayout img="/404.png">
      <Flex flexDir="column">
        <Text fontSize="9xl" fontWeight="black">
          404
        </Text>
        <Text fontSize="2xl" fontWeight="semibold">
          Oops! You ran out of ink.
        </Text>
        <Center flexDir="column" alignItems="start" spacing={4} maxW="sm">
          <Text color="bg.500">
            The page you're looking for does not exist. Lets get you{" "}
            <NextLink href="/home">
              <Link>back home.</Link>
            </NextLink>
          </Text>
        </Center>
      </Flex>
    </ImageLayout>
  );
}
