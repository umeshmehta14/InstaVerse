import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Flex,
  Text,
  HStack,
  useColorMode,
  Button,
  useDisclosure,
  Box,
} from "@chakra-ui/react";

import { mobileNavbarStyle } from "../../styles/NavbarStyles";
import SearchBox from "./Navbar Components/SearchBox";
import SideBar from "./Navbar Components/SideBar";
import {
  MdSearch,
  BsFillSunFill,
  BsMoon,
  AiOutlineDown,
} from "../../utils/Icons";
import { useUser } from "../../contexts";
import { SwitchAccountModal } from "../index";
import { useSelector } from "react-redux";

export const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const location = useLocation();
  const searchDrawerDisclosure = useDisclosure();
  const switchUserDisclosure = useDisclosure();
  const navigate = useNavigate();

  const {
    userState: { selectedUser },
  } = useUser();
  const { currentUser } = useSelector((state) => state.authentication);

  if (location?.pathname === "/login" || location?.pathname === "/signup") {
    return null;
  }

  return (
    <>
      <Flex
        bg={colorMode === "light" ? "white.900" : "black.900"}
        {...mobileNavbarStyle}
      >
        <Text
          fontFamily={"Pacifico, cursive"}
          fontSize={"1.2rem"}
          title="Instaverse | Home"
          onClick={() => navigate("/")}
        >
          InstaVerse
        </Text>
        <HStack>
          {location?.pathname.includes("/profile") ? (
            <Flex w="56vw" alignItems="center" justifyContent="center">
              {currentUser?.username === selectedUser?.username ? (
                <Flex
                  gap={2}
                  align={"center"}
                  fontWeight={"bold"}
                  title={currentUser?.username}
                  onClick={switchUserDisclosure.onOpen}
                >
                  {currentUser?.username}
                  <Box as={AiOutlineDown} fontSize={"1.2rem"} />
                </Flex>
              ) : (
                <Flex
                  align={"center"}
                  fontWeight={"bold"}
                  title={selectedUser?.username}
                >
                  {selectedUser?.username}
                </Flex>
              )}
            </Flex>
          ) : (
            <Button
              variant={"link-button"}
              fontSize={"2rem"}
              color={colorMode === "light" ? "black" : "blue.900"}
              onClick={searchDrawerDisclosure.onOpen}
              title="Search"
            >
              <MdSearch />
            </Button>
          )}
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
      {searchDrawerDisclosure.isOpen && (
        <SearchBox
          isOpen={searchDrawerDisclosure.isOpen}
          onClose={searchDrawerDisclosure.onClose}
        />
      )}
      {switchUserDisclosure.isOpen && (
        <SwitchAccountModal
          onClose={switchUserDisclosure.onClose}
          isOpen={switchUserDisclosure.isOpen}
        />
      )}
    </>
  );
};
