import { useToast as useChakraToast } from "@chakra-ui/toast";

export function useToast() {
  const toast = useChakraToast();
  return (status = "success", msg = "operation was successful.", props = {}) =>
    toast({ isClosable: true, position: "bottom-right", status, description: msg, title: "done", ...props });
}

export function useDefaultToast() {
  const toast = useChakraToast();
  return (props) => toast({ isClosable: true, position: "bottom-right", ...props });
}

export function useSuccessToast() {
  const toast = useDefaultToast();
  return (props) => toast({ title: "done!", status: "success", ...props });
}

export function useErrorToast() {
  const toast = useDefaultToast();
  return (props) => toast({ title: "something went wrong...", status: "error", ...props });
}
