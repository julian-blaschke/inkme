import { AccountSettingsForm } from "@/components/form/AccountSettingsForm";
import { AppearanceSettingsForm } from "@/components/form/AppearanceSettings";
import { ProfileSettingsForm } from "@/components/form/ProfileSettingsForm";
import { SecuritySettingsForm } from "@/components/form/SecuritySettingsForm";
import { Section } from "@/components/layout/Section";
import { SideBarLayout } from "@/components/layout/SideBarLayout";
import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";

export default function Settings() {
  return (
    <SideBarLayout>
      <Section title="Settings" variant="h1"></Section>
      <Section
        title="Profile Settings"
        subtitle="Your profile is the public profile others will actually see on this platform. In this section you can edit your public profile."
        id="profile"
      >
        <ProfileSettingsForm />
      </Section>
      <Section
        title="Security & Privacy Settings"
        subtitle="In this section you can update your password, as well as manage preferences for email notifications & newsletter subscription."
        id="security"
      >
        <SecuritySettingsForm />
      </Section>
      <Section
        title="Account Settings"
        id="account"
        subtitle="Your Account is your `private` profile that represents your membership with this platform."
      >
        <Alert status="error" mt={4} fontSize="sm" borderRadius="md">
          <AlertIcon />
          <AlertDescription>this is the danger zone - be careful, in this section you can modify or even delete your account.</AlertDescription>
        </Alert>
        <AccountSettingsForm />
      </Section>
      <Section title="Appearance Settings" id="appearance" subtitle="Here you can modify appearence of this application.">
        <AppearanceSettingsForm />
      </Section>
    </SideBarLayout>
  );
}
