import NextLink from "next/link";
import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuGroup, MenuItem, MenuList } from "@chakra-ui/menu";
import { usePrimaryBackgroundColor } from "@/styles/usePrimaryColor";

export function ShopMenu({ name }) {
  const bg = usePrimaryBackgroundColor();
  return (
    <Menu size="sm">
      {({ isOpen }) => (
        <>
          <MenuButton isActive={isOpen} as={IconButton} icon={<ChevronDownIcon />} size="sm" />
          <MenuList bg={bg} fontSize="sm">
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
