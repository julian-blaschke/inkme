import { DELETE_GUESTSPOT } from "@/firebase/mutations";
import { useAuth } from "@/hooks/useAuth";
import { useErrorToast, useSuccessToast } from "@/hooks/useToast";
import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";

export function GuestSpotMenu({ id, shop, isAccepted }) {
  const { user } = useAuth();

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  async function remove() {
    try {
      await DELETE_GUESTSPOT(shop, id);
      successToast({ description: "guestspot deleted." });
    } catch ({ message }) {
      errorToast({ description: message });
    }
  }

  return (
    <Menu size="xs">
      {({ isOpen }) => (
        <>
          <MenuButton isActive={isOpen} as={IconButton} icon={<ChevronDownIcon />} size="sm" />
          <MenuList fontSize="sm">
            <MenuItem onClick={remove}>delete</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}
