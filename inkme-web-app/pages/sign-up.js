import { Button, Center, Checkbox, Container, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

import { LoggedInAlert } from "@/components/LoggedInAlert";
import { ErrorAlert } from "@/components/ErrorAlert";
import { useAuth } from "@/hooks/useAuth";
import { ImageLayout } from "@/components/layout/ImageLayout";
import { primaryColorScheme } from "@/styles/theme";

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

  //TODO: make seperate page for instagram link
  if (user) return <LoggedInAlert></LoggedInAlert>;

  return (
    <ImageLayout img="/bear.png">
      <Flex flexDir="column" maxW="md">
        <Heading as="h1" fontSize="5xl" fontWeight="black">
          Join us!
        </Heading>
        <Text>Create your account</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mt={12} spacing={4}>
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
            <Button type="submit" colorScheme={primaryColorScheme} isLoading={formState.isSubmitting}>
              Sign Up
            </Button>
          </Stack>
        </form>
        <Center fontSize="sm" mt={2} pb={4}>
          <Text>
            Already a member? <Link href="/sign-in">Sign in here.</Link>
          </Text>
        </Center>
      </Flex>
    </ImageLayout>
  );
};

export default SignUp;
