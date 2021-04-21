import { CenteredSpinner } from "@/components/CenteredSpinner";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useDocument } from "@/firebase/hooks";
import { UPDATE_SHOP } from "@/firebase/mutations";
import { SHOP } from "@/firebase/queries";
import { useErrorToast, useSuccessToast } from "@/hooks/useToast";
import { primaryColorScheme } from "@/styles/theme";
import { Button } from "@chakra-ui/button";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { Divider, Stack } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";
import { Textarea } from "@chakra-ui/textarea";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

export default function ShopSettings() {
  const { name } = useRouter().query;

  const shopRef = useMemo(() => SHOP(name), [name]);
  const [shop] = useDocument(shopRef, "name");

  return (
    <DashboardLayout title="Settings" subtitle={`manage shop preferences for ${name}.`}>
      {shop ? <ShopSettingsForm defaultValues={shop} /> : <CenteredSpinner />}
      <Divider variant="dashed" pb="4" />
    </DashboardLayout>
  );
}

function ShopSettingsForm({ defaultValues }) {
  const { register, handleSubmit, formState } = useForm({ defaultValues });
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  async function onSubmit(values) {
    try {
      await UPDATE_SHOP(defaultValues.name, values);
      successToast({ description: `successfully updated ${defaultValues.name}.` });
    } catch ({ message }) {
      errorToast({ description: message });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="12" my="8">
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input autoCorrect="off" name="address" type="address" ref={register()}></Input>
          <FormHelperText>We recommend providing the full address to your shop, to make it easy for customers to find your shop.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Textarea name="bio" ref={register()} placeholder="come here if you want..."></Textarea>
          <FormHelperText>Tell your customers what they can expect at your shop (in terms of style, rules, etc..</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Link Instagram</FormLabel>
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
