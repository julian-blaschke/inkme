import NextLink from "next/link";
import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";

export function ShopMenu({ name }) {
  return (
    <Menu size="sm">
      {({ isOpen }) => (
        <>
          <MenuButton isActive={isOpen} as={IconButton} icon={<ChevronDownIcon />} size="sm" />
          <MenuList fontSize="sm">
            <NextLink href={`/profile/shops/${name}/settings`}>
              <MenuItem>settings</MenuItem>
            </NextLink>
            <NextLink href={`/profile/shops/${name}/artists`}>
              <MenuItem>manage artists</MenuItem>
            </NextLink>
            <NextLink href={`/profile/shops/${name}/guestspots`}>
              <MenuItem>manage guest spots</MenuItem>
            </NextLink>
          </MenuList>
        </>
      )}
    </Menu>
  );
}
