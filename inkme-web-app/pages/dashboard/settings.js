import { DashboardLayout } from "@/components/DashboardLayout";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Stack, Input, Textarea, Switch, Button } from "@chakra-ui/react";

export default function Settings() {
  return (
    <DashboardLayout title="Profile Settings">
      <Stack spacing="12" my="16">
        <FormControl>
          <FormLabel>Link your personal website</FormLabel>
          <Input placeholder="https://www.postmalone.com"></Input>
          <FormHelperText>We will show a link to your website on your public profile.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Link your Instagram</FormLabel>
          <Input placeholder="https://www.instagram.com/postmalone/"></Input>
          <FormHelperText>
            just copy & paste the link to your public instagram profile in here. We will show your latest posts & a link to your instagram-profile on
            your public profile.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Use Instagram Profile Picture</FormLabel>
          <Switch size="lg"></Switch>
          <FormHelperText>use my instagram profile picture also as my ink.me profile picture.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Textarea placeholder="is specialize in..."></Textarea>
          <FormHelperText>Tell us something about yourself & your work.</FormHelperText>
        </FormControl>
        <Button>save</Button>
      </Stack>
    </DashboardLayout>
  );
}
