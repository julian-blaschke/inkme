import { UPDATE_ACCOUNT } from "@/firebase/mutations";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { primaryColorScheme } from "@/styles/theme";
import { Button } from "@chakra-ui/button";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Switch } from "@chakra-ui/switch";
import { useCallback } from "react";
import { FormLayout } from "../layout/FormLayout";
import { FormSubmitButton } from "./FormSubmitButton";

export function SecuritySettingsForm({ defaultValues }) {
  const { user } = useAuth();
  const handler = useCallback((values) => UPDATE_ACCOUNT(user?.uid, values), [user]);

  const { register, isSubmitting, onSubmit } = useForm(defaultValues, handler, "sucessfully updated preferences.");

  return (
    <FormLayout onSubmit={onSubmit}>
      <FormControl>
        <FormLabel>Enable Email Notifications</FormLabel>
        <Switch size="lg" colorScheme={primaryColorScheme} name="allowsEmailNotifications" ref={register()} />
        <FormHelperText>On certain events (e.g. invites to a new shop/guestspot) we notify you per email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Subscribe to Newsletter</FormLabel>
        <Switch size="lg" colorScheme={primaryColorScheme} name="isNewsLetterSubscribed" ref={register()} />
        <FormHelperText>Recieve occasional emails from us, informing you about news in our community. </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Reset password</FormLabel>
        <Button size="md">Reset password</Button>
        <FormHelperText>On certain events (e.g. invites to a new shop/guestspot) we notify you per email.</FormHelperText>
      </FormControl>
      <FormSubmitButton title="save" isSubmitting={isSubmitting} />
    </FormLayout>
  );
}
