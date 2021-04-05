import { DashboardLayout } from "@/components/DashboardLayout";
import { UPDATE_PROFILE } from "@/firebase/mutations";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useErrorToast, useSuccessToast } from "@/hooks/useToast";
import { primaryColorScheme } from "@/styles/usePrimaryColor";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Button, Input, InputGroup, InputLeftAddon, Progress, Stack, Switch, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function Settings() {
  const { profile } = useProfile();

  if (!profile) return <Progress size="xs" colorScheme={primaryColorScheme} isIndeterminate />;

  return (
    <DashboardLayout title="Profile Settings 🔧" subtitle="manage your account preferences.">
      <SettingsForm defaultValues={profile} />
    </DashboardLayout>
  );
}

function SettingsForm({ defaultValues }) {
  const { user } = useAuth();
  const { register, handleSubmit, formState } = useForm({ defaultValues });

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const onSubmit = async (values) => {
    try {
      await UPDATE_PROFILE(user?.uid, values);
      successToast({ description: "your profile was successfully updated." });
    } catch ({ message }) {
      errorToast({ description: message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="12" my="16">
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Textarea name="bio" ref={register()} placeholder="is specialize in..."></Textarea>
          <FormHelperText>Tell us something about yourself & your work.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Link your personal website</FormLabel>
          <Input name="website" ref={register()} placeholder="https://www.postmalone.com"></Input>
          <FormHelperText>We will show a link to your website on your public profile.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Link your Instagram</FormLabel>
          <InputGroup>
            <InputLeftAddon bg="transparent">https://www.instagram.com/</InputLeftAddon>
            <Input name="instagram" ref={register()} placeholder="postmalone"></Input>
          </InputGroup>
          <FormHelperText>
            just copy & paste the link to your public instagram profile in here. We will show your latest posts & a link to your instagram-profile on
            your public profile.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Use Instagram Profile Picture</FormLabel>
          <Switch name="useInstagramProfilePicture" ref={register()} size="lg" colorScheme={primaryColorScheme}></Switch>
          <FormHelperText>use my instagram profile picture also as my ink.me profile picture.</FormHelperText>
        </FormControl>
        <Button type="submit" colorScheme={primaryColorScheme} isLoading={formState.isSubmitting}>
          save
        </Button>
      </Stack>
    </form>
  );
}
