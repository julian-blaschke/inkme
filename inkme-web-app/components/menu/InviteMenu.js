import { DELETE_INVITE, UPDATE_INVITE } from "@/firebase/mutations";
import { useAuth } from "@/hooks/useAuth";
import { useErrorToast, useSuccessToast } from "@/hooks/useToast";
import { usePrimaryBackgroundColor } from "@/styles/usePrimaryColor";
import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";

export function InviteMenu({ shop }) {
  const { user } = useAuth();
  const bg = usePrimaryBackgroundColor();

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  async function cancel() {
    try {
      await DELETE_INVITE(shop, user?.uid);
      successToast({ description: "invite deleted." });
    } catch ({ message }) {
      errorToast({ description: message });
    }
  }

  return (
    <Menu size="xs">
      {({ isOpen }) => (
        <>
          <MenuButton isActive={isOpen} as={IconButton} icon={<ChevronDownIcon />} size="sm" />
          <MenuList bg={bg} fontSize="sm">
            <MenuItem onClick={cancel}>delete invite</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}
