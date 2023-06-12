import React, { useState } from "react";
import {
  Flex,
  Text,
  HStack,
  useColorMode,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import SearchBox from "./Navbar Components/SearchBox";
import { mobileNavbarStyle } from "../../styles/Styles";
import SideBar from "./Navbar Components/SideBar";
import { MdSearch, BsFillSunFill, BsMoon } from "../../utils/Icons";

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <>
      <Flex
        bg={useColorModeValue("white.900", "black.900")}
        {...mobileNavbarStyle}
        // flexDir="column"
      >
        <Text
          fontFamily={"Pacifico, cursive"}
          fontSize={"1.2rem"}
          title="InstaVerse"
        >
          InstaVerse
        </Text>
        <HStack>
          {openSearch ? (
            <SearchBox setOpenSearch={setOpenSearch} openSearch={openSearch} />
          ) : (
            <Button
              variant={"link-button"}
              fontSize={"2rem"}
              color={colorMode === "light" ? "black" : "blue.900"}
              onClick={() => setOpenSearch(!openSearch)}
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
          >
            {colorMode === "light" ? <BsMoon /> : <BsFillSunFill />}
          </Button>
        </HStack>
      </Flex>
      <SideBar />
    </>
  );
};

export default NavBar;
