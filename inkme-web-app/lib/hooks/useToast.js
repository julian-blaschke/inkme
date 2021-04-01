import { useToast } from "@chakra-ui/toast";

export function useDefaultToast() {
  const toast = useToast();
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
