import { HStack, Text, useColorMode } from "@chakra-ui/react";

import { navlinkStyle } from "../../../styles/NavbarStyles";

export const NavItem = ({ icon: Icon, label }) => {
  const { colorMode } = useColorMode();

  return (
    <HStack
      {...navlinkStyle}
      _hover={colorMode === "dark" ? { bg: "#323232ad" } : ""}
      className="nav-item"
    >
      <Icon className="nav-icon" />
      <Text display={{ base: "none", lg: "inline-block" }} fontSize="1rem">
        {label}
      </Text>
    </HStack>
  );
};
