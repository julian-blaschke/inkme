import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef } from "react";

const SignIn = () => {
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <Container p={8} display="flex" flexDir="column">
      <Heading>Welcome Back!</Heading>
      <Text>Sign into your account.</Text>
      <Stack p={4} mt={12} spacing={4}>
        {/* email input */}
        <FormControl>
          <FormLabel>Email Adress</FormLabel>
          <Input type="email" ref={emailRef}></Input>
        </FormControl>
        {/* password input */}
        <FormControl mb={6}>
          <FormLabel>Password</FormLabel>
          <Input type="password"></Input>
        </FormControl>
        <Button colorScheme="orange">Sign In</Button>
      </Stack>
      <Center fontSize="sm">
        <Text>
          Not a member? <Link href="/sign-up">Sign up here.</Link>
        </Text>
      </Center>
    </Container>
  );
};

export default SignIn;
