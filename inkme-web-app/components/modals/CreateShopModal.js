import { createShop } from "@/firebase/mutations";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { SmallAddIcon } from "@chakra-ui/icons";
import { Center, Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";

import { useForm } from "react-hook-form";
import { useColorModeValue } from "@chakra-ui/color-mode";

export function CreateShopModal() {
  //TODO: make shop modal form persistent
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, formState } = useForm({
    defaultValues: { name: "tats for rats", address: "Vienna, Austria", instagram: "tats4rats" },
  });
  const toast = useToast();
  const bg = useColorModeValue("white", "gray.900");

  async function onSubmit(values) {
    try {
      await createShop({ ...values, owner: user?.uid });
      toast({
        title: `shop "${values.name}" sucessfully created.`,
        description: `we added ${values.name} to your shops. you can also send out invites to artists, that are working there.`,
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
      onClose();
    } catch ({ message }) {
      toast({ title: "something went wrong...", description: message, status: "error", isClosable: true, position: "bottom-right" });
    }
  }

  return (
    <Center>
      <Button variant="outline" colorScheme="blue" size="xs" leftIcon={<SmallAddIcon />} onClick={onOpen}>
        create shop
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4} bg={bg}>
          <ModalHeader>Create a new shop</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="info">
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
              <Button type="submit" size="sm" colorScheme="blue" isLoading={formState.isSubmitting}>
                create
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
}
