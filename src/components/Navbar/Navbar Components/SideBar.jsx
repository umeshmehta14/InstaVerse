import { useEffect, useMemo } from "react";
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
import { useDispatch, useSelector } from "react-redux";

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
  BsDot,
} from "../../../utils/Icons";
import {
  NavItem,
  PostModal,
  SwitchAccountModal,
  SearchBox,
  Notifications,
} from "../../index";
import {
  sidebarStyle,
  navRoutesStyle,
  desktopLogoStyles,
  sidebarLogoBoxStyles,
  navlinkStyle,
  sideBarLogoMain,
  navPopOverMain,
  notificationDotStyle,
} from "../../../styles/NavbarStyles";
import { logoutHandler } from "../../../pages/Authentication/authenticationSlice";
import {
  getHomePosts,
  getUserNotifications,
} from "../../../pages/Post Feed/postSlice";
import {
  getUserSearchList,
  updateTab,
} from "../../../pages/Post Feed/userSlice";

const SideBar = ({ searchDrawerDisclosure }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const postModalDisclosure = useDisclosure();
  const switchUserDisclosure = useDisclosure();
  const notificationDisclosure = useDisclosure();

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.authentication);
  const { notifications } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const newNotifications = notifications?.find(
    (notification) => !notification?.read
  );

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHomeClick = () => {
    dispatch(getHomePosts({ page: 1 }));
    handleNavigate("/");
  };

  const handleSearchClick = () => {
    dispatch(getUserSearchList());
    searchDrawerDisclosure.onOpen();
  };

  const handleCreatePostClick = () => {
    postModalDisclosure.onOpen();
  };

  const handleNotificationsClick = () => {
    dispatch(getUserNotifications());
    notificationDisclosure.onOpen();
  };

  const handleProfileClick = () => {
    dispatch(updateTab(0));
    handleNavigate(`/profile/${currentUser?.username}`);
  };

  const navLinkProps = useMemo(
    () => ({
      _hover: colorMode === "dark" ? { bg: "#323232ad" } : {},
      className: "nav-item",
      fontSize: "1rem",
    }),
    [colorMode]
  );

  useEffect(() => {
    dispatch(getUserNotifications());
  }, []);

  return (
    <Flex {...sidebarStyle} bg={useColorModeValue("white.900", "black.900")}>
      <Flex {...sidebarLogoBoxStyles}>
        <HStack {...desktopLogoStyles}>
          <Text display={{ base: "none", md: "flex", lg: "none" }}>
            <FaInstalod />
          </Text>
          <Text
            {...sideBarLogoMain}
            onClick={handleHomeClick}
            title="Instaverse | Home"
          >
            InstaVerse
          </Text>
        </HStack>
        <Flex {...navRoutesStyle}>
          <NavLink
            to="/"
            title="Home"
            className={"w-full"}
            onClick={handleHomeClick}
          >
            <NavItem icon={MdHome} label="Home" />
          </NavLink>

          <HStack
            id="md-search-nav"
            w={"100%"}
            justifyContent={"center"}
            onClick={handleSearchClick}
            title="Search"
          >
            <NavItem icon={MdSearch} label="Search" />
          </HStack>

          <NavLink className={"w-full"} to="/explore" title="Explore">
            <NavItem icon={MdOutlineExplore} label="Explore" />
          </NavLink>

          <HStack
            onClick={handleCreatePostClick}
            w={"100%"}
            justifyContent={"center"}
            title="Create Post"
          >
            <NavItem icon={TbSquareRoundedPlus} label="Create" />
          </HStack>

          <HStack
            onClick={handleNotificationsClick}
            pos="relative"
            title="Likes"
            justifyContent={"center"}
            w={"100%"}
          >
            <NavItem icon={AiOutlineHeart} label="Notifications" />
            {newNotifications && <Text as={BsDot} {...notificationDotStyle} />}
          </HStack>

          <NavLink
            onClick={handleProfileClick}
            to={`/profile/${currentUser?.username}`}
            title="Profile"
            className={"w-full"}
          >
            <HStack {...navlinkStyle} {...navLinkProps}>
              <Avatar size="sm" src={currentUser?.avatar?.url} />
              <Text display={{ base: "none", lg: "inline-block" }}>
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
              w={"100%"}
              justifyContent={{ base: "center", lg: "flex-start" }}
              fontSize={"2rem"}
              title="More"
            >
              <NavItem icon={RxHamburgerMenu} label="More" />
            </HStack>
          </PopoverTrigger>
          <PopoverContent
            width="13rem"
            bg={colorMode === "light" ? "white.500" : "gray.700"}
          >
            <Button justifyContent="space-between" onClick={toggleColorMode}>
              <span>Switch Appearance</span>
              <BsMoon />
            </Button>
            <Button
              justifyContent="flex-start"
              gap={2}
              onClick={() =>
                handleNavigate(`/profile/${currentUser?.username}/saved`)
              }
            >
              Saved <FaRegBookmark />
            </Button>
            <Button
              justifyContent="flex-start"
              onClick={switchUserDisclosure.onOpen}
            >
              Switch Accounts
            </Button>
            <Button
              justifyContent="flex-start"
              gap={2}
              onClick={() => dispatch(logoutHandler())}
              color="red.500"
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
      {switchUserDisclosure.isOpen && (
        <SwitchAccountModal
          isOpen={switchUserDisclosure.isOpen}
          onClose={switchUserDisclosure.onClose}
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
