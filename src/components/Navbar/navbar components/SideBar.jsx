import React, { useRef } from "react";
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
import { useAuth, useUser } from "../../../contexts";
import { SET_SELECTED_USER } from "../../../utils/Constants";
import SearchBox from "./SearchBox";

const SideBar = ({ searchDrawerDisclosure }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const navigate = useNavigate();
  const postModalDisclosure = useDisclosure();
  const { logoutHandler, currentUser } = useAuth();
  const { userDispatch } = useUser();

  const getStyle = ({ isActive }) => (isActive ? { fontWeight: "bold" } : {});

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
              columnGap={"0.8rem"}
            >
              <MdHome />
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
            columnGap={"0.8rem"}
            cursor={"pointer"}
            onClick={searchDrawerDisclosure.onOpen}
          >
            <MdSearch />
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
              columnGap={"0.8rem"}
            >
              <MdOutlineExplore />
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
            columnGap={"0.8rem"}
            onClick={postModalDisclosure.onOpen}
            cursor={"pointer"}
          >
            <TbSquareRoundedPlus />
            <Text
              display={{ base: "none", lg: "inline-block" }}
              fontSize={"1rem"}
            >
              Create
            </Text>
          </HStack>

          <NavLink style={getStyle} className="nav-links" to="/">
            <HStack
              {...navlinkStyle}
              _hover={colorMode === "dark" ? { bg: "#323232ad" } : ""}
              columnGap={"0.8rem"}
            >
              <AiOutlineHeart />
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
            onClick={() =>
              userDispatch({ type: SET_SELECTED_USER, payload: currentUser })
            }
          >
            <HStack
              {...navlinkStyle}
              _hover={colorMode === "dark" ? { bg: "#323232ad" } : ""}
              columnGap={"0.8rem"}
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

      <Box display={{ base: "none", md: "block" }}>
        <Popover>
          <PopoverTrigger>
            <HStack
              columnGap={"0.8rem"}
              cursor={"pointer"}
              mt={"4rem"}
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
            <Button onClick={logoutHandler}>LogOut</Button>
          </PopoverContent>
        </Popover>
      </Box>

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
