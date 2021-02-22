import { AlertIcon, Alert } from "@chakra-ui/alert";

export function ErrorAlert({ message }) {
  return (
    <Alert status="error">
      <AlertIcon />
      {message || "something went wrong"}
    </Alert>
  );
}
