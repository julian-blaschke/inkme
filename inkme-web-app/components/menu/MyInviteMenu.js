import { UPDATE_INVITE } from "@/firebase/mutations";
import { useAuth } from "@/hooks/useAuth";
import { useMenuBackgroundValue } from "@/hooks/useColorModeValue";
import { useErrorToast, useSuccessToast } from "@/hooks/useToast";
import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";

export function MyInviteMenu({ shop }) {
  const { user } = useAuth();
  const bg = useMenuBackgroundValue();

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  async function update(status) {
    try {
      await UPDATE_INVITE(shop, user.uid, status);
      successToast({ description: `changed status to '${status}'.` });
    } catch ({ message }) {
      errorToast({ description: message });
    }
  }

  return (
    <Menu size="sm">
      {({ isOpen }) => (
        <>
          <MenuButton isActive={isOpen} as={IconButton} icon={<ChevronDownIcon />} size="sm" />
          <MenuList bg={bg} fontSize="sm">
            <MenuItem onClick={() => update("accepted")}>accept</MenuItem>
            <MenuItem onClick={() => update("rejected")}>reject</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}
