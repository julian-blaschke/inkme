import { UPDATE_PROFILE } from "@/firebase/mutations";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { primaryColorScheme } from "@/styles/theme";
import { Button } from "@chakra-ui/button";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { Switch } from "@chakra-ui/switch";
import { useCallback } from "react";
import { FormLayout } from "../layout/FormLayout";
import { FormSubmitButton } from "./FormSubmitButton";

export function ProfileSettingsForm({ defaultValues }) {
  const { user } = useAuth();
  const handler = useCallback((values) => UPDATE_PROFILE(user?.uid, values), [user]);

  const { register, isSubmitting, onSubmit } = useForm(defaultValues, handler, "sucessfully updated profile.");
  return (
    <FormLayout onSubmit={onSubmit}>
      <FormControl>
        <FormLabel>Link Instagram</FormLabel>
        <InputGroup>
          <InputLeftAddon fontSize="xs" bg="transparent">
            https://www.instagram.com/
          </InputLeftAddon>
          <Input name="instagram" ref={register()} placeholder="postmalone"></Input>
        </InputGroup>
        <FormHelperText>
          just copy & paste the link to your public instagram profile in here. We will show your latest posts & a link to your instagram-profile on
          your public profile.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Link your personal website</FormLabel>
        <Input name="website" ref={register()} placeholder="https://www.postmalone.com"></Input>
        <FormHelperText>We will show a link to your website on your public profile.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Provide a public Email</FormLabel>
        <Input name="publicEmail" ref={register()} placeholder="postmalone@email.com"></Input>
        <FormHelperText>A chance for potential customers to reach out to you. This email will be publicly avaiable.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Provide a public Name</FormLabel>
        <Input name="fullname" ref={register()} placeholder="Post Malone"></Input>
        <FormHelperText>For a more personal experience, customers can see also your name on your Profile Page</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Show Instagram posts on my profile</FormLabel>
        <Switch name="showInstagramPosts" ref={register()} size="lg" colorScheme={primaryColorScheme}></Switch>
        <FormHelperText>We can auto-sync all your instagram posts & show them on your public profile here too.</FormHelperText>
      </FormControl>
      <FormSubmitButton title="save" isSubmitting={isSubmitting} />
    </FormLayout>
  );
}
