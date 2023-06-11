import React, { useState } from "react";
import {
  Flex,
  Text,
  HStack,
  useColorMode,
  Button,
  useColorModeValue,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";

import SearchBox from "./navbar components/SearchBox";
import {
  mobileNavbarStyle,
  sidebarStyle,
  navRoutesStyle,
  desktopLogoStyles,
} from "../../styles/Styles";
import {
  MdHome,
  MdOutlineExplore,
  AiOutlineHeart,
  TbSquareRoundedPlus,
  MdSearch,
  BsFillSunFill,
  FaInstalod,
  RxHamburgerMenu,
  BsMoon,
} from "../../utils/Icons";
import PostModal from "../post modal/PostModal";

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [openSearch, setOpenSearch] = useState(false);
  const navigate = useNavigate();
  const {onOpen, isOpen, onClose} = useDisclosure();

  return (
    <>
      <Flex
        bg={useColorModeValue("white.900", "black.900")}
        {...mobileNavbarStyle}
      >
        <Text fontFamily={"Pacifico, cursive"} fontSize={"1.2rem"} title="InstaVerse">
          InstaVerse
        </Text>
        <HStack>
          {openSearch ? (
            <SearchBox setOpenSearch={setOpenSearch} openSearch={openSearch}/>
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
            title={colorMode === "light" ? "Dark Mode": "Light Mode"}
          >
            {colorMode === "light" ? <BsMoon /> : <BsFillSunFill />}
          </Button>
        </HStack>
      </Flex>

      <Flex {...sidebarStyle} bg={useColorModeValue("white.900", "black.900")}>
        <Flex
          flexDirection={{ base: "row", md: "column" }}
          h={{ base: "auto", md: "70%" }}
          w={{ base: "100%", lg: "90%" }}
          mx={"auto"}
          maxH={"520px"}
          justifyContent={{ base: "space-between", lg: "flex-start" }}
        >
          <HStack {...desktopLogoStyles}>
            <Text display={{ base: "none", md: "flex", lg: "none" }}>
              <FaInstalod />
            </Text>

            <Text
              fontFamily={"Pacifico, cursive"}
              fontSize={"1.5rem"}
              display={{ base: "none", lg: "flex" }}
              onClick={() => navigate("/")}
            >
              InstaVerse
            </Text>
          </HStack>
          <Flex {...navRoutesStyle}>
            <NavLink to="/">
              <HStack columnGap={"0.8rem"}>
                <MdHome />
                <Text
                  display={{ base: "none", lg: "inline-block" }}
                  fontSize={"1rem"}
                >
                  Home
                </Text>
              </HStack>
            </NavLink>

            <NavLink to="/" id="md-search-nav">
              <HStack columnGap={"0.8rem"}>
                <MdSearch />
                <Text
                  display={{ base: "none", lg: "inline-block" }}
                  fontSize={"1rem"}
                >
                  Search
                </Text>
              </HStack>
            </NavLink>

            <NavLink to="/explore">
              <HStack columnGap={"0.8rem"}>
                <MdOutlineExplore />
                <Text
                  display={{ base: "none", lg: "inline-block" }}
                  fontSize={"1rem"}
                >
                  Explore
                </Text>
              </HStack>
            </NavLink>

              <HStack columnGap={"0.8rem"} onClick={onOpen} cursor={"pointer"}>
                <TbSquareRoundedPlus />
                <Text
                  display={{ base: "none", lg: "inline-block" }}
                  fontSize={"1rem"}
                >
                  Create
                </Text>
              </HStack>

            <NavLink to="/likeposts">
              <HStack columnGap={"0.8rem"}>
                <AiOutlineHeart />
                <Text
                  display={{ base: "none", lg: "inline-block" }}
                  fontSize={"1rem"}
                >
                  Likes
                </Text>
              </HStack>
            </NavLink>

            <NavLink to="/">
              <HStack columnGap={"0.8rem"}>
                <Avatar
                  size={"sm"}
                  name="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                />
                <Text
                  display={{ base: "none", lg: "inline-block" }}
                  fontSize={"1rem"}
                >
                  Profile
                </Text>
              </HStack>
            </NavLink>
          </Flex>
        </Flex>

        <Box display={{ base: "none", md: "block" }}>
          <Popover>
            <PopoverTrigger>
              <HStack
                columnGap={"0.8rem"}
                cursor={"pointer"}
                my={"4rem"}
                ml={"1.5rem"}
                fontSize={"2rem"}
              >
                <RxHamburgerMenu />
                <Text
                  display={{ base: "none", lg: "inline-block" }}
                  fontSize={"1rem"}
                >
                  More
                </Text>
              </HStack>
            </PopoverTrigger>
            <PopoverContent
              width={"13rem"}
              bg={colorMode === "light" ? "white.500" : "gray.700"}
            >
              <Button
                justifyContent={"space-between"}
                onClick={toggleColorMode}
              >
                <span>Switch Apperrance</span>
                <BsMoon />
              </Button>
              <Button>LogOut</Button>
            </PopoverContent>
          </Popover>
        </Box>
        <PostModal onClose={onClose} isOpen={isOpen}/>
      </Flex>
    </>
  );
};

export default NavBar;
