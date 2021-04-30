import { AccountSettingsForm } from "@/components/form/AccountSettingsForm";
import { AppearanceSettingsForm } from "@/components/form/AppearanceSettings";
import { ProfileSettingsForm } from "@/components/form/ProfileSettingsForm";
import { SecuritySettingsForm } from "@/components/form/SecuritySettingsForm";
import { GridLayoutItem } from "@/components/layout/GridLayout";
import { PrivatePageHeader } from "@/components/PrivatePageHeader";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertDescription, AlertIcon, Box, Container, Link, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";

function SideBar() {
  const { signOut } = useAuth();
  const { push } = useRouter();

  const signOutHandler = useCallback(async () => {
    await signOut();
    push("/sign-in");
  }, [signOut]);

  return (
    <Box position={{ md: "fixed" }}>
      <SimpleGrid gap={{ base: 4, md: 8 }} columns={{ base: 2, md: 1 }} mt={{ base: 4, md: 12 }} fontSize="sm">
        <Link href="#profile">Profile Settings</Link>
        <Link href="#security">Security & Privacy Settings</Link>
        <Link href="#account">Account Settings</Link>
        <Link href="#appearance">Appearance Settings</Link>
        <Box pt={{ md: 6 }}>
          <Link onClick={signOutHandler}>sign out</Link>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default function Settings() {
  return (
    <>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2 }} templateColumns={{ base: "1fr", md: "240px auto" }}>
          <GridLayoutItem>
            <SideBar />
          </GridLayoutItem>
          <SimpleGrid columns={1} gap={16} mb={24} borderLeftWidth={{ md: 1 }}>
            <GridLayoutItem>
              <PrivatePageHeader title="Settings" link={<Link href="/me">dashboard</Link>} containerProps={{ px: 0 }} />
            </GridLayoutItem>
            <GridLayoutItem title="Profile Settings" id="profile" containerProps={{ pt: 24, mt: -24 }}>
              <ProfileSettingsForm />
            </GridLayoutItem>
            <GridLayoutItem title="Security & Privacy Settings" id="security" containerProps={{ pt: 24, mt: -24 }}>
              <SecuritySettingsForm />
            </GridLayoutItem>
            <GridLayoutItem title="Account Settings" id="account" containerProps={{ pt: 24, mt: -24 }}>
              <Alert status="error" mt={4} fontSize="sm">
                <AlertIcon />
                <AlertDescription>this is the danger zone - be careful, in this section you can modify or even delete your account.</AlertDescription>
              </Alert>
              <AccountSettingsForm />
            </GridLayoutItem>
            <GridLayoutItem title="Appearance Settings" id="appearance" containerProps={{ pt: 24, mt: -24 }}>
              <AppearanceSettingsForm />
            </GridLayoutItem>
          </SimpleGrid>
        </SimpleGrid>
      </Container>
    </>
  );
}
