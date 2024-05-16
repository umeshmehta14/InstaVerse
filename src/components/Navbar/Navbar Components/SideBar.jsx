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
  sideBarLogoMain,
  navPopOverMain,
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
  FaRegBookmark,
  FiLogOut,
} from "../../../utils/Icons";
import { useUser } from "../../../contexts";
import SearchBox from "./SearchBox";
import { SET_DEFAULT_TAB } from "../../../utils/Constants";
import { SwitchAccountModal } from "../../index";
import { useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "../../../pages/Authentication/authenticationSlice";
import Notifications from "./Notifications";

const SideBar = ({ searchDrawerDisclosure }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const navigate = useNavigate();
  const postModalDisclosure = useDisclosure();
  const SwitchUserDisclosure = useDisclosure();
  const notificationDisclosure = useDisclosure();
  const { currentUser } = useSelector((state) => state.authentication);
  const { userDispatch } = useUser();

  const dispatch = useDispatch();

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
            {...sideBarLogoMain}
            onClick={() => {
              window.location.reload();
              navigate("/");
            }}
            title="Instaverse | Home"
          >
            InstaVerse
          </Text>
        </HStack>
        <Flex {...navRoutesStyle}>
          <NavLink style={getStyle} className="nav-links" to="/" title="Home">
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
            title="Search"
          >
            <MdSearch className="nav-icon" />
            <Text
              display={{ base: "none", lg: "inline-block" }}
              fontSize={"1rem"}
            >
              Search
            </Text>
          </HStack>

          <NavLink
            style={getStyle}
            className="nav-links"
            to="/explore"
            title="Explore"
          >
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
            title="Create Post"
          >
            <TbSquareRoundedPlus className="nav-icon" />
            <Text
              display={{ base: "none", lg: "inline-block" }}
              fontSize={"1rem"}
            >
              Create
            </Text>
          </HStack>

          <HStack
            {...navlinkStyle}
            _hover={colorMode === "dark" ? { bg: "#323232ad" } : ""}
            className="nav-item"
            title="Likes"
            onClick={notificationDisclosure.onOpen}
          >
            <AiOutlineHeart className="nav-icon" />
            <Text
              display={{ base: "none", lg: "inline-block" }}
              fontSize={"1rem"}
            >
              Likes
            </Text>
          </HStack>

          <NavLink
            style={getStyle}
            className="nav-links"
            to={`/profile/${currentUser?.username}`}
            title="Profile"
          >
            <HStack
              {...navlinkStyle}
              _hover={colorMode === "dark" ? { bg: "#323232ad" } : ""}
            >
              <Avatar size={"sm"} src={currentUser?.avatar?.url} />
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

      <Flex {...navPopOverMain}>
        <Popover>
          <PopoverTrigger>
            <HStack
              {...navlinkStyle}
              fontSize={"2rem"}
              title="More"
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
            <Button
              justifyContent={"flex-start"}
              gap={2}
              onClick={() => {
                userDispatch({ type: SET_DEFAULT_TAB, payload: 2 });
                navigate(`/profile/${currentUser?.username}`);
              }}
            >
              Saved <FaRegBookmark />
            </Button>
            <Button
              justifyContent={"flex-start"}
              onClick={SwitchUserDisclosure.onOpen}
            >
              Switch Accounts
            </Button>
            <Button
              justifyContent={"flex-start"}
              gap={2}
              onClick={() => dispatch(logoutHandler())}
              color={"red.500"}
            >
              LogOut <FiLogOut />
            </Button>
          </PopoverContent>
        </Popover>
      </Flex>

      {postModalDisclosure.isOpen && (
        <PostModal
          onClose={postModalDisclosure.onClose}
          isOpen={postModalDisclosure.isOpen}
        />
      )}
      {searchDrawerDisclosure.isOpen && (
        <SearchBox
          isOpen={searchDrawerDisclosure.isOpen}
          onClose={searchDrawerDisclosure.onClose}
        />
      )}
      {SwitchUserDisclosure.isOpen && (
        <SwitchAccountModal
          isOpen={SwitchUserDisclosure.isOpen}
          onClose={SwitchUserDisclosure.onClose}
        />
      )}
      {notificationDisclosure.isOpen && (
        <Notifications
          isOpen={notificationDisclosure.isOpen}
          onClose={notificationDisclosure.onClose}
        />
      )}
    </Flex>
  );
};

export default SideBar;
