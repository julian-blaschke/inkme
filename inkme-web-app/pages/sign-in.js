import { Button, Center, Container, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import { LoggedInAlert } from "@/components/LoggedInAlert";
import { ErrorAlert } from "@/components/ErrorAlert";
import { ImageLayout } from "@/components/layout/ImageLayout";
import { primaryColorScheme } from "@/styles/theme";

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
    <ImageLayout img="/sign-in.png">
      <Flex flexDir="column" maxW="md">
        <Heading as="h1" fontSize="5xl" fontWeight="black">
          Welcome Back!
        </Heading>
        <Text>Sign in to your account</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mt={12} spacing={4}>
            {/* email input */}
            <FormControl isRequired>
              <FormLabel>Email Adress</FormLabel>
              <Input type="email" name="email" placeholder="post@malone.com" ref={register()}></Input>
            </FormControl>
            {/* password input */}
            <FormControl mb={6} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" placeholder="password1234" ref={register()}></Input>
            </FormControl>
            {error && <ErrorAlert message={error}></ErrorAlert>}
            <Button type="submit" colorScheme={primaryColorScheme} isLoading={formState.isSubmitting}>
              Sign In
            </Button>
          </Stack>
        </form>
        <Center fontSize="sm" mt={2} pb={4}>
          <Text>
            Not a member? <Link href="/sign-up">Sign up here.</Link>
          </Text>
        </Center>
      </Flex>
    </ImageLayout>
  );
}
