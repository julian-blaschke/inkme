import { useDocument } from "@/firebase/hooks";
import { CREATE_GUESTSPOT } from "@/firebase/mutations";
import { getArtistByUsername, SHOP } from "@/firebase/queries";
import { useAuth } from "@/hooks/useAuth";
import { useDebouncedHandler } from "@/hooks/useDebouncedHandler";
import { useErrorToast, useSuccessToast } from "@/hooks/useToast";
import { primaryColorScheme } from "@/styles/theme";
import { Button } from "@chakra-ui/button";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { CheckIcon, SmallAddIcon, WarningIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Center, Flex } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Spinner } from "@chakra-ui/spinner";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export function InviteArtistsToGuestSpotModal({ shop }) {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const shopRef = useMemo(() => SHOP(shop), [shop]);
  const [shopData] = useDocument(shopRef, "name");
  const img = useMemo(() => shopData?._artists?.map((a) => a.img), [shopData]);

  const [value, setValue] = useState("");
  const [artist, setArtist] = useState();
  const [range, setRange] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  let footer = "Please pick the first day.";
  if (range?.from && !range?.to) footer = "Please pick the last day.";
  if (range?.from && range?.to) footer = `${format(range?.from, "PPP")}–${format(range?.to, "PPP")}`;

  async function onChange(username) {
    const artist = await getArtistByUsername(username);
    //TODO: make a tooltip to suggest looking them up on inkme too see if they even have an inkme account
    setArtist(artist);
    setIsLoading(false);
  }
  const handler = useDebouncedHandler(onChange);

  async function onSubmit() {
    try {
      setIsSubmitting(true);
      console.log(img);
      await CREATE_GUESTSPOT(shop, { inviter: user?.uid, artist: artist.username, artistImg: artist.img, range, img: shopData.img || img });
      successToast({ description: `we sent an invite to ${artist}.` });
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
        <ModalContent mx={4}>
          <ModalHeader>Invite an artist to Guest Spot</ModalHeader>
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
                    isLoading ? (
                      <Spinner size="sm" color="blue.500" />
                    ) : artist ? (
                      <CheckIcon color="green.500" />
                    ) : value ? (
                      <WarningIcon color="red.300" />
                    ) : null
                  }
                />
              </InputGroup>
              <FormHelperText>type in the artists username on ink.me or copy & paste it from their public profile</FormHelperText>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Duration of Stay</FormLabel>
              <Flex flexDir="column" alignItems="center">
                <DayPicker required mode="range" onSelect={setRange} defaultSelected={range} />
                <FormHelperText>{footer}</FormHelperText>
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={primaryColorScheme} size="sm" isLoading={isSubmitting} onClick={onSubmit} disabled={!artist || !range}>
              send invite
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
