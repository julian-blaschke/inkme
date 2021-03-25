import { createInvite } from "@/firebase/mutations";
import { getArtistByUsername, getArtists } from "@/firebase/queries";
import { useAuth } from "@/hooks/useAuth";
import { useDebouncedHandler } from "@/hooks/useDebouncedHandler";
import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { CheckIcon, SmallAddIcon, WarningIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Center } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";

export function InviteArtistsToShopModal({ shop }) {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("white", "gray.900");
  const toast = useToast();

  const [value, setValue] = useState("");
  const [artist, setArtist] = useState();
  const [role, setRole] = useState("co-owner");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onChange(username) {
    const artist = await getArtistByUsername(username);
    setArtist(artist ? artist.username : undefined);
    setIsLoading(false);
  }
  const handler = useDebouncedHandler(onChange);

  async function onSubmit() {
    try {
      setIsSubmitting(true);
      await createInvite({ inviter: user.uid, invitee: artist, role, shop });
      toast({
        status: "success",
        position: "bottom-right",
        title: "invite sent!",
        description: `we sent an invite to ${artist}. As soon as they accept your invite, they will be listed under this shop.`,
        isClosable: true,
      });
      onClose();
    } catch ({ message }) {
      toast({ status: "error", position: "bottom-right", title: "something went wrong...", description: message, isClosable: true });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Center py={4}>
      <Button variant="outline" colorScheme="blue" size="xs" leftIcon={<SmallAddIcon />} onClick={onOpen}>
        Send invite
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bg}>
          <ModalHeader>Add other artists to this shop</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>username of artist</FormLabel>
              <InputGroup size="sm">
                <Input
                  value={value}
                  placeholder="search away..."
                  onChange={(e) => {
                    setValue(e.target.value);
                    setArtist(null);
                    setIsLoading(true);
                    handler(e.target.value);
                  }}
                  autoCorrect="off"
                ></Input>
                <InputRightElement
                  children={
                    isLoading ? <Spinner size="sm" color="blue.500" /> : artist ? <CheckIcon color="green.500" /> : <WarningIcon color="red.500" />
                  }
                />
              </InputGroup>
              <FormHelperText>type in the artists username on ink.me or copy & paste it from their public profile</FormHelperText>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>role at this shop</FormLabel>
              <Select size="sm" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="co-owner">co owner</option>
                <option value="appreantice">appreantice</option>
                <option value="replacement">replacement</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" size="sm" isLoading={isSubmitting} onClick={onSubmit}>
              send invite
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
