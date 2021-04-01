import { Button, Center, Checkbox, Container, FormControl, FormHelperText, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

import { LoggedInAlert } from "@/components/LoggedInAlert";
import { ErrorAlert } from "@/components/ErrorAlert";
import { useAuth } from "@/hooks/useAuth";

const SignUp = () => {
  const { handleSubmit, register, errors, formState } = useForm();
  const { user, signUp } = useAuth();
  const [error, setError] = useState();

  const onSubmit = async (values) => {
    try {
      setError("");
      await signUp(values);
    } catch ({ message }) {
      setError(message);
    }
  };

  if (user) return <LoggedInAlert></LoggedInAlert>;

  return (
    <Container p={8} display="flex" flexDir="column">
      <Heading>Join us!</Heading>
      <Text>Create your account.</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack p={4} mt={12} spacing={4}>
          {/* username input */}
          <FormControl isRequired isInvalid={errors.username} isRequired>
            <FormLabel>Username</FormLabel>
            <Input autoCorrect="off" name="username" ref={register({ isRequired: true })}></Input>
            <FormHelperText>Your username will be publicly available.</FormHelperText>
          </FormControl>
          {/* email input */}
          <FormControl isRequired isInvalid={errors.email} isRequired>
            <FormLabel>Email Adress</FormLabel>
            <Input type="email" name="email" ref={register()}></Input>
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          {/* password input */}
          <FormControl isRequired isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" ref={register()}></Input>
            <FormHelperText>Better be safe than sorry and pick a strong password.</FormHelperText>
          </FormControl>
          {/* isArtist input */}
          <FormControl mb={6}>
            <Checkbox name="isArtist" ref={register()}>
              I am a tattoo artist
            </Checkbox>
            <FormHelperText>Check this if you are working as a tattoo artist & want to use this site to promote your work.</FormHelperText>
          </FormControl>
          {error && <ErrorAlert message={error}></ErrorAlert>}
          <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>
            Sign Up
          </Button>
        </Stack>
      </form>
      <Center fontSize="sm">
        <Text>
          Already a member? <Link href="/sign-in">Sign in here.</Link>
        </Text>
      </Center>
    </Container>
  );
};

export default SignUp;
