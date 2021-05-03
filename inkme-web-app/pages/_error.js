import { ImageLayout } from "@/components/layout/ImageLayout";
import { Center, Flex, Link, Text } from "@chakra-ui/layout";
import NextLink from "next/link";

function Error({ statusCode }) {
  return (
    <ImageLayout img="/crash.png">
      <Flex flexDir="column">
        <Text fontSize="9xl" fontWeight="black">
          {statusCode}
        </Text>
        <Text fontSize="2xl" fontWeight="semibold">
          Oops! something crashed.
        </Text>
        <Center flexDir="column" alignItems="start" spacing={4} maxW="sm">
          <Text color="bg.500">
            We're so sorry this happend. Lets get you{" "}
            <NextLink href="/home">
              <Link>back home.</Link>
            </NextLink>
          </Text>
        </Center>
      </Flex>
    </ImageLayout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
