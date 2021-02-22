import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { useAuth } from "../lib/hooks/useAuth";

export function LoggedInAlert() {
  const { user, signOut } = useAuth();
  return (
    <Alert status="success" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        You are already logged in!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        You are already logged in as <b>{user.uid}</b>. To login with a different account you first have to logout & then come back here again. Click
        <Button variant="link" onClick={signOut}>
          here
        </Button>
        here to logout.
      </AlertDescription>
    </Alert>
  );
}
