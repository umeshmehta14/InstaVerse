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

import { PostModal } from "../../index";
import {
  sidebarStyle,
  navRoutesStyle,
  desktopLogoStyles,
  sidebarLogoBoxStyles,
  navlinkStyle,
} from "../../../styles/NavbarStyles";
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
import { useAuth } from "../../../contexts";
import SearchBox from "./SearchBox";

const SideBar = ({ searchDrawerDisclosure }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const navigate = useNavigate();
  const postModalDisclosure = useDisclosure();
  const { logoutHandler, currentUser } = useAuth();

  const getStyle = ({ isActive }) =>
    isActive ? { fontWeight: "bold", fontSize: "2.08rem" } : {};

  return (
    <Flex {...sidebarStyle} bg={useColorModeValue("white.900", "black.900")}>
      <Flex {...sidebarLogoBoxStyles}>
        <HStack {...desktopLogoStyles}>
          <Text display={{ base: "none", md: "flex", lg: "none" }}>
            <FaInstalod />
          </Text>

          <Text
            fontFamily={"Pacifico, cursive"}
            fontSize={"1.5rem"}
            display={{ base: "none", lg: "flex" }}
            pl="0.5rem"
            onClick={() => navigate("/")}
          >
            InstaVerse
          </Text>
        </HStack>
        <Flex {...navRoutesStyle}>
          <NavLink style={getStyle} className="nav-links" to="/">
            <HStack
              {...navlinkStyle}
              _hover={colorMode === "dark" ? { bg: "#323232ad" } : ""}
              className="nav-item"
            >
              <MdHome className="nav-icon" />
              <Text
                display={{ base: "none", lg: "inline-block" }}
                fontSize={"1rem"}
              >
                Home
              </Text>
            </HStack>
          </NavLink>

          <HStack
            id="md-search-nav"
            {...navlinkStyle}
            _hover={colorMode === "dark" ? { bg: "#323232ad" } : ""}
            onClick={searchDrawerDisclosure.onOpen}
            className="nav-item"
          >
            <MdSearch className="nav-icon" />
            <Text
              display={{ base: "none", lg: "inline-block" }}
              fontSize={"1rem"}
            >
              Search
            </Text>
          </HStack>

          <NavLink style={getStyle} className="nav-links" to="/explore">
            <HStack
              {...navlinkStyle}
              _hover={colorMode === "dark" ? { bg: "#323232ad" } : ""}
              className="nav-item"
            >
              <MdOutlineExplore className="nav-icon" />
              <Text
                display={{ base: "none", lg: "inline-block" }}
                fontSize={"1rem"}
              >
                Explore
              </Text>
            </HStack>
          </NavLink>

          <HStack
            {...navlinkStyle}
            _hover={colorMode === "dark" ? { bg: "#323232ad" } : ""}
            onClick={postModalDisclosure.onOpen}
            className="nav-item"
          >
            <TbSquareRoundedPlus className="nav-icon" />
            <Text
              display={{ base: "none", lg: "inline-block" }}
              fontSize={"1rem"}
            >
              Create
            </Text>
          </HStack>

          <NavLink style={getStyle} className="nav-links" to="/like">
            <HStack
              {...navlinkStyle}
              _hover={colorMode === "dark" ? { bg: "#323232ad" } : ""}
              className="nav-item"
            >
              <AiOutlineHeart className="nav-icon" />
              <Text
                display={{ base: "none", lg: "inline-block" }}
                fontSize={"1rem"}
              >
                Likes
              </Text>
            </HStack>
          </NavLink>

          <NavLink
            style={getStyle}
            className="nav-links"
            to={`/profile/${currentUser?.username}`}
          >
            <HStack
              {...navlinkStyle}
              _hover={colorMode === "dark" ? { bg: "#323232ad" } : ""}
            >
              <Avatar
                size={"sm"}
                name="Dan Abrahmov"
                src={
                  currentUser?.avatarURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAeY_IFrsiUIvvfnSvAcmrdoNUprysMGfCQ&usqp=CAU"
                }
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

      <Flex
        display={{ base: "none", md: "flex" }}
        w={{ md: "100%", lg: "90%" }}
        mx={"auto"}
        mt={"7rem"}
        justify={"center"}
        className="nav-item"
      >
        <Popover>
          <PopoverTrigger>
            <HStack
              {...navlinkStyle}
              fontSize={"2rem"}
              _hover={colorMode === "dark" ? { bg: "#323232ad" } : ""}
            >
              <RxHamburgerMenu className="nav-icon" />
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
            <Button onClick={logoutHandler}>LogOut</Button>
          </PopoverContent>
        </Popover>
      </Flex>

      <PostModal
        onClose={postModalDisclosure.onClose}
        isOpen={postModalDisclosure.isOpen}
      />
      <SearchBox
        isOpen={searchDrawerDisclosure.isOpen}
        onClose={searchDrawerDisclosure.onClose}
      />
    </Flex>
  );
};

export default SideBar;
