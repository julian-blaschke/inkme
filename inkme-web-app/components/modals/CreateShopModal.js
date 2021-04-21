import { useDocument } from "@/firebase/hooks";
import { CREATE_SHOP } from "@/firebase/mutations";
import { ARTIST } from "@/firebase/queries";
import { useAuth } from "@/hooks/useAuth";
import { useErrorToast, useSuccessToast } from "@/hooks/useToast";
import { primaryColorScheme } from "@/styles/theme";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { SmallAddIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { Center, Stack } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

export function CreateShopModal() {
  //TODO: make shop modal form persistent
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, formState } = useForm({
    defaultValues: { name: "hyperhumanttt", address: "Vienna, Austria", instagram: "httt" },
  });
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const ownerRef = useMemo(() => ARTIST(user?.uid), [user?.uid]);
  const [owner] = useDocument(ownerRef, "username");

  async function onSubmit(values) {
    try {
      await CREATE_SHOP({ ...values, owner: user?.uid, ownerImg: owner?.img });
      successToast({ description: `we added ${values.name} to your shops. you can also send out invites to artists, that are working there.` });
      onClose();
    } catch ({ message }) {
      errorToast({ description: message });
    }
  }

  return (
    <Center>
      <Button variant="link" size="sm" leftIcon={<SmallAddIcon />} onClick={onOpen}>
        create a new shop
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new shop</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Alert status="info" colorScheme={primaryColorScheme}>
                <AlertIcon />
                keep in mind that only owners should create shops!
                {
                  //TODO: link to FAQ `who should create shops`
                }
              </Alert>
              <Stack py={4} spacing={8} as="form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl isRequired>
                  <FormLabel>name</FormLabel>
                  <Input name="name" ref={register()} size="sm" placeholder="Needle Barn"></Input>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>address</FormLabel>
                  <Input name="address" ref={register()} size="sm" placeholder="Needlestreet 31, Vienna"></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>instagram link</FormLabel>
                  <InputGroup size="sm">
                    <InputLeftAddon bg="transparent">https://www.instagram.com/</InputLeftAddon>
                    <Input name="instagram" ref={register()} placeholder="needle-barn"></Input>
                  </InputGroup>
                  <FormHelperText>
                    we will pull all relevant data, like profile picture & posts, from instagram & reuse it here. Of course we will keep everything
                    updated, always.
                  </FormHelperText>
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" size="sm" colorScheme={primaryColorScheme} isLoading={formState.isSubmitting}>
                create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Center>
  );
}
