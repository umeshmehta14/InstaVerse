import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Flex,
  Text,
  HStack,
  Button,
  useColorModeValue,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";

import PostModal from "../../Post Modal/PostModal";
import {
  sidebarStyle,
  navRoutesStyle,
  desktopLogoStyles,
} from "../../../styles/Styles";
import {
  MdHome,
  MdOutlineExplore,
  AiOutlineHeart,
  TbSquareRoundedPlus,
  MdSearch,
  FaInstalod,
  RxHamburgerMenu,
  BsMoon,
} from "../../../utils/Icons";

const SideBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const navigate = useNavigate();
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
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
            <Button justifyContent={"space-between"} onClick={toggleColorMode}>
              <span>Switch Apperrance</span>
              <BsMoon />
            </Button>
            <Button>LogOut</Button>
          </PopoverContent>
        </Popover>
      </Box>
      <PostModal onClose={onClose} isOpen={isOpen} />
    </Flex>
  );
};

export default SideBar;
