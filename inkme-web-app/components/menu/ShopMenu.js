import NextLink from "next/link";
import { useMenuBackgroundValue } from "@/hooks/useColorModeValue";
import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuGroup, MenuItem, MenuList } from "@chakra-ui/menu";

export function ShopMenu({ name }) {
  const bg = useMenuBackgroundValue();
  return (
    <Menu size="sm">
      {({ isOpen }) => (
        <>
          <MenuButton isActive={isOpen} as={IconButton} icon={<ChevronDownIcon />} size="sm" />
          <MenuList bg={bg} fontSize="sm">
            <NextLink href={`/profile/shops/${name}/settings`}>
              <MenuItem>shop settings</MenuItem>
            </NextLink>
            <MenuItem>shop chat</MenuItem>
            <MenuItem>leave temporarily</MenuItem>
            <MenuItem>leave shop</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}
