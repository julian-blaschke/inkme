import { UPDATE_PROFILE } from "@/firebase/mutations";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { Button } from "@chakra-ui/button";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Switch } from "@chakra-ui/switch";
import { useCallback } from "react";
import { FormLayout } from "../layout/FormLayout";
import { FormSubmitButton } from "./FormSubmitButton";

export function AccountSettingsForm({ defaultValues }) {
  const { user } = useAuth();
  const handler = useCallback((values) => UPDATE_PROFILE(user?.uid, values), [user]);

  const { register, isSubmitting, onSubmit } = useForm(defaultValues, handler, "sucessfully updated preferences.");

  return (
    <FormLayout onSubmit={onSubmit}>
      <FormControl>
        <FormLabel>Export account data</FormLabel>
        <Button size="md">export</Button>
        <FormHelperText>export all your shops & guestspots and profile metadata.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Delete account permanently</FormLabel>
        <Button size="sm" colorScheme="red" variant="outline">
          delete account
        </Button>
        <FormHelperText>
          Your public profile will be deleted & not accessible to the public. Some information (e.g. past guestspots) will remain.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Enable Ghost Mode</FormLabel>
        <Switch size="lg" colorScheme="red" name="isGhostMode" ref={register()} />
        <FormHelperText>Want to take a break? Ghost mode makes sure that your profile won't be publicly accessible.</FormHelperText>
      </FormControl>
      <FormSubmitButton title="save" isSubmitting={isSubmitting} />
    </FormLayout>
  );
}
