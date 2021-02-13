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
import { useEffect, useRef } from "react";

const SignUp = () => {
  return (
    <Container p={8} display="flex" flexDir="column">
      <Heading>Join us!</Heading>
      <Text>create your account.</Text>
      <Stack p={4} mt={12} spacing={4}>
        {/* email input */}
        <FormControl isRequired>
          <FormLabel>Email Adress</FormLabel>
          <Input type="email"></Input>
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        {/* password input */}
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password"></Input>
          <FormHelperText>
            Better be safe than sorry and pick a strong password.
          </FormHelperText>
        </FormControl>
        {/* isArtist input */}
        <FormControl mb={6}>
          <Checkbox>I am a tattoo artist</Checkbox>
          <FormHelperText>
            Check this if you are working as a tattoo artist & want to use this
            site to promote your work.
          </FormHelperText>
        </FormControl>
        <Button colorScheme="orange">Sign Up</Button>
      </Stack>
      <Center fontSize="sm">
        <Text>
          Already a member? <Link href="/sign-in">Sign in here.</Link>
        </Text>
      </Center>
    </Container>
  );
};

export default SignUp;
