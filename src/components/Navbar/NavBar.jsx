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
  useColorModeValue,
} from "@chakra-ui/react";

import { mobileNavbarStyle } from "../../styles/NavbarStyles";
import SideBar from "./Navbar Components/SideBar";
import {
  MdSearch,
  BsFillSunFill,
  BsMoon,
  AiOutlineDown,
} from "../../utils/Icons";
import { SwitchAccountModal, SearchBox } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { getUserSearchList } from "../../pages/Post Feed/userSlice";

export const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const searchDrawerDisclosure = useDisclosure();
  const switchUserDisclosure = useDisclosure();

  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.authentication);
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (
    location?.pathname === "/login" ||
    location?.pathname === "/signup" ||
    location?.pathname === "/accounts/password/emailConfirmation/" ||
    location?.pathname === "/accounts/password/reset/confirm/"
  ) {
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
          title="Instaverse | Home"
          onClick={() => {
            window.location.reload();
            navigate("/");
          }}
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
              onClick={() => {
                dispatch(getUserSearchList());
                searchDrawerDisclosure.onOpen();
              }}
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
