import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Flex,
  Text,
  HStack,
  useColorMode,
  Button,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import SearchBox from "./Navbar Components/SearchBox";
import { mobileNavbarStyle } from "../../styles/NavbarStyles";
import SideBar from "./Navbar Components/SideBar";
import { MdSearch, BsFillSunFill, BsMoon } from "../../utils/Icons";

export const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const location = useLocation();
  const searchDrawerDisclosure = useDisclosure();
  const navigate = useNavigate();

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <>
      <Flex
        bg={useColorModeValue("white.900", "black.900")}
        {...mobileNavbarStyle}
      >
        <Text
          fontFamily={"Pacifico, cursive"}
          fontSize={"1.2rem"}
          title="InstaVerse"
          onClick={() => navigate("/")}
        >
          InstaVerse
        </Text>
        <HStack>
          <Button
            variant={"link-button"}
            fontSize={"2rem"}
            color={colorMode === "light" ? "black" : "blue.900"}
            onClick={searchDrawerDisclosure.onOpen}
            title="Search"
          >
            <MdSearch />
          </Button>
          <Button
            variant={"link-button"}
            fontSize={"1.6rem"}
            color={colorMode === "light" ? "black" : "blue.900"}
            onClick={toggleColorMode}
            title={colorMode === "light" ? "Dark Mode" : "Light Mode"}
            p="0"
          >
            {colorMode === "light" ? <BsMoon /> : <BsFillSunFill />}
          </Button>
        </HStack>
      </Flex>
      <SideBar searchDrawerDisclosure={searchDrawerDisclosure} />
      <SearchBox
        isOpen={searchDrawerDisclosure.isOpen}
        onClose={searchDrawerDisclosure.onClose}
      />
    </>
  );
};
