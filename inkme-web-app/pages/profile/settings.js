import { DashboardLayout } from "@/components/DashboardLayout";
import { useProfile } from "@/hooks/useProfile";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Stack, Input, Textarea, Switch, Button, useToast, Progress, Skeleton, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function Settings() {
  const { profile } = useProfile();

  if (!profile) return <Progress size="xs" colorScheme="pink" isIndeterminate />;

  return (
    <DashboardLayout title="Profile Settings">
      <SettingsForm defaultValues={profile} />
    </DashboardLayout>
  );
}

function SettingsForm({ defaultValues }) {
  const { profile, update } = useProfile();
  const { register, handleSubmit, formState } = useForm({ defaultValues });
  const toast = useToast();

  const onSubmit = async (values) => {
    try {
      let affected = 0;
      for (let key in profile) {
        if (profile[key] !== values[key]) affected++;
      }
      if (affected === 0) throw new Error("no values changed!");

      await update(values);

      toast({
        title: "done.",
        description: `successfully udpated ${affected} values.`,
        isClosable: true,
        position: "bottom-right",
        status: "success",
      });
    } catch ({ message }) {
      toast({ title: "something went wrong...", description: message, status: "warning", isClosable: true, position: "bottom-right" });
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
          <Switch name="useInstagramProfilePicture" ref={register()} size="lg"></Switch>
          <FormHelperText>use my instagram profile picture also as my ink.me profile picture.</FormHelperText>
        </FormControl>
        <Button type="submit" isLoading={formState.isSubmitting}>
          save
        </Button>
      </Stack>
    </form>
  );
}
