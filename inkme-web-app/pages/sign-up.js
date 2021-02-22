import {
  Button,
  Center,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signUp } from "../lib/auth";

const SignUp = () => {
  const { handleSubmit, register, errors, formState } = useForm();

  return (
    <Container p={8} display="flex" flexDir="column">
      <Heading>Join us!</Heading>
      <Text>Create your account.</Text>
      <form onSubmit={handleSubmit(signUp)}>
        <Stack p={4} mt={12} spacing={4}>
          {/* email input */}
          <FormControl isRequired isInvalid={errors.name}>
            <FormLabel>Email Adress</FormLabel>
            <Input type="username" name="username" ref={register()}></Input>
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          {/* password input */}
          <FormControl isRequired>
            <FormLabel>passowrd</FormLabel>
            <Input type="password" name="password" ref={register()}></Input>
            <FormHelperText>
              Better be safe than sorry and pick a strong password.
            </FormHelperText>
          </FormControl>
          {/* isArtist input */}
          <FormControl mb={6}>
            <Checkbox name="isArtist" ref={register()}>
              I am a tattoo artist
            </Checkbox>
            <FormHelperText>
              Check this if you are working as a tattoo artist & want to use
              this site to promote your work.
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            colorScheme="orange"
            isLoading={formState.isSubmitting}
          >
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
