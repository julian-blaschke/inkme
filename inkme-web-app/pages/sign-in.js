import { Button, Center, Container, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import { LoggedInAlert } from "@/components/LoggedInAlert";
import { ErrorAlert } from "@/components/ErrorAlert";
import { useState } from "react";

export default function SignIn() {
  const { handleSubmit, register, formState } = useForm();
  const { user, signIn } = useAuth();
  const [error, setError] = useState();

  const onSubmit = async (values) => {
    try {
      setError("");
      await signIn(values);
    } catch ({ message }) {
      setError(message);
    }
  };

  if (user) return <LoggedInAlert></LoggedInAlert>;

  return (
    <Container p={8} display="flex" flexDir="column">
      <Heading>Welcome Back!</Heading>
      <Text>Sign into your account.</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack p={4} mt={12} spacing={4}>
          {/* email input */}
          <FormControl>
            <FormLabel>Email Adress</FormLabel>
            <Input type="email" name="email" ref={register()}></Input>
          </FormControl>
          {/* password input */}
          <FormControl mb={6}>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" ref={register()}></Input>
          </FormControl>
          {error && <ErrorAlert message={error}></ErrorAlert>}
          <Button colorScheme="orange" type="submit" isLoading={formState.isSubmitting}>
            Sign In
          </Button>
        </Stack>
      </form>
      <Center fontSize="sm">
        <Text>
          Not a member? <Link href="/sign-up">Sign up here.</Link>
        </Text>
      </Center>
    </Container>
  );
}
