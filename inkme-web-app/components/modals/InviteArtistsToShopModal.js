import { CREATE_INVITE } from "@/firebase/mutations";
import { getArtistByUsername } from "@/firebase/queries";
import { useAuth } from "@/hooks/useAuth";
import { useDebouncedHandler } from "@/hooks/useDebouncedHandler";
import { useErrorToast, useSuccessToast } from "@/hooks/useToast";
import { primaryColorScheme } from "@/styles/theme";
import { Button } from "@chakra-ui/button";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { CheckIcon, SmallAddIcon, WarningIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Center } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/spinner";
import { useState } from "react";

export function InviteArtistsToShopModal({ shop }) {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const [value, setValue] = useState("");
  const [artist, setArtist] = useState();
  const [role, setRole] = useState("co-owner");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onChange(username) {
    const artist = await getArtistByUsername(username);
    setArtist(artist ? artist : undefined);
    setIsLoading(false);
  }
  const handler = useDebouncedHandler(onChange);

  async function onSubmit() {
    try {
      setIsSubmitting(true);
      await CREATE_INVITE({ inviter: user.uid, img: artist.img, invitee: artist.username, artist: artist.username, role, shop });
      successToast({
        description: `we sent an invite to ${artist.username}. As soon as they accept your invite, they will be listed under this shop.`,
      });
      onClose();
    } catch ({ message }) {
      errorToast({ description: message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Center py={4}>
      <Button variant="link" size="sm" leftIcon={<SmallAddIcon />} onClick={onOpen}>
        Send invite
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
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
            <Button colorScheme={primaryColorScheme} size="sm" isLoading={isSubmitting} onClick={onSubmit} disabled={!artist}>
              send invite
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
