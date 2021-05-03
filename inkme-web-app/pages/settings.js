import { AccountSettingsForm } from "@/components/form/AccountSettingsForm";
import { AppearanceSettingsForm } from "@/components/form/AppearanceSettings";
import { ProfileSettingsForm } from "@/components/form/ProfileSettingsForm";
import { SecuritySettingsForm } from "@/components/form/SecuritySettingsForm";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GridLayoutItem } from "@/components/layout/GridLayout";
import { PrivatePageHeader } from "@/components/PrivatePageHeader";
import { useDocument } from "@/firebase/hooks";
import { ARTIST } from "@/firebase/queries";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertDescription, AlertIcon, Box, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

function SideBarLinks() {
  const { signOut } = useAuth();
  const { push } = useRouter();

  const signOutHandler = useCallback(async () => {
    await signOut();
    push("/sign-in");
  }, [signOut]);

  return (
    <>
      <Link href="#profile">Profile Settings</Link>
      <Link href="#security">Security & Privacy Settings</Link>
      <Link href="#account">Account Settings</Link>
      <Link href="#appearance">Appearance Settings</Link>
      <Box pt={{ md: 6 }}>
        <Link onClick={signOutHandler}>sign out</Link>
      </Box>
    </>
  );
}

export default function Settings() {
  const { user } = useAuth();

  const profileRef = useMemo(() => ARTIST(user?.uid), [user]);
  const [profile] = useDocument(profileRef);

  return (
    <DashboardLayout
      header={
        <PrivatePageHeader
          title="Settings"
          quickLinksTitle="Your Profile"
          img={profile?.img}
          link={<Link href="/me">dashboard</Link>}
        ></PrivatePageHeader>
      }
      linkList={<SideBarLinks />}
    >
      <GridLayoutItem
        title="Profile Settings"
        subtitle="Your profile is the public profile others will actually see on this platform. In this section you can edit your public profile."
        id="profile"
      >
        <ProfileSettingsForm />
      </GridLayoutItem>
      <GridLayoutItem title="Security & Privacy Settings" subtitle="" id="security">
        <SecuritySettingsForm />
      </GridLayoutItem>
      <GridLayoutItem title="Account Settings" id="account">
        <Alert status="error" mt={4} fontSize="sm" borderRadius="md">
          <AlertIcon />
          <AlertDescription>this is the danger zone - be careful, in this section you can modify or even delete your account.</AlertDescription>
        </Alert>
        <AccountSettingsForm />
      </GridLayoutItem>
      <GridLayoutItem title="Appearance Settings" id="appearance">
        <AppearanceSettingsForm />
      </GridLayoutItem>
    </DashboardLayout>
  );
}
