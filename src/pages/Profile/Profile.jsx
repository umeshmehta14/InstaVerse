import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Flex,
  Box,
  Avatar,
  Text,
  Button,
  Divider,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";

import { useAuth, usePost, useUser } from "../../contexts";
import { SET_SELECTED_USER } from "../../utils/Constants";
import GridBox from "./Profile Components/GridBox";
import ProfileSkeleton from "./Profile Components/ProfileSkeleton";
import { FollowedByUsers, UserListModal } from "../../components";
import {
  FiLogOut,
  MdGridOn,
  FaRegBookmark,
  AiOutlineHeart,
} from "../../utils/Icons";
import { useState } from "react";

export const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const paramUser = useParams();
  const [userList, setUserList] = useState("");

  const {
    handleSingleUser,
    userState: { selectedUser },
    userDispatch,
  } = useUser();
  const {
    getAllUserPosts,
    postState: { posts, userAllPost },
  } = usePost();
  const { progress, currentUser, logoutHandler } = useAuth();

  const {
    _id,
    username,
    firstName,
    lastName,
    avatarURL,
    bio,
    following,
    followers,
    portfolio,
    bookmarks,
  } = selectedUser;

  const likedPosts =
    currentUser.username === username
      ? posts?.filter(({ likes }) =>
          likes.likedBy?.some((user) => user.username === username)
        )
      : [];

  const bookmarkPosts =
    currentUser.username === username
      ? posts?.filter(({ _id }) => bookmarks?.includes(_id))
      : [];

  const currentUserCheck = currentUser.username === username;

  useEffect(() => {
    getAllUserPosts(paramUser.username);
    handleSingleUser(paramUser.username);
    if (_id?.length === 0) {
      navigate("/");
    }
    return () => {
      userDispatch({ type: SET_SELECTED_USER, payload: null });
    };
  }, [paramUser.username]);

  return progress === 100 ? (
    <Flex direction="column" mb={{ base: "4.2rem", md: "0.4rem" }}>
      <Flex alignItems="center" width="100%" gap="1rem" p="1rem">
        <Avatar size="xl" src={avatarURL} />
        <Flex flexDir={"column"} gap={"0.5rem"}>
          <Flex
            fontSize="2xl"
            fontWeight="bold"
            mb={2}
            align={"center"}
            gap={"2"}
          >
            {username}
            <Box
              as={FiLogOut}
              fontSize={"1.4rem"}
              onClick={logoutHandler}
              title="Logout"
            />
          </Flex>
          <Box>
            {!currentUserCheck && (
              <Button variant={"follow-button"} title="Follow">
                Follow
              </Button>
            )}
            {currentUserCheck && (
              <>
                <Button
                  variant="following-button"
                  mr={2}
                  w="100%"
                  title="Edit Profile"
                >
                  Edit Profile
                </Button>
              </>
            )}
          </Box>
        </Flex>
      </Flex>
      <Flex flexDir="column" w="100%" gap="0.1rem" p={"0.5rem 1rem"}>
        <Text>{` ${firstName} ${lastName}`}</Text>
        <Text>{bio}</Text>
        <Text color={"blue.200"}>
          <Link to={portfolio}>{portfolio}</Link>
        </Text>
      </Flex>
      {!currentUserCheck && <FollowedByUsers followers={followers} />}

      <Divider />
      <HStack w="100%" justifyContent="space-around" p="1rem">
        <Text>{userAllPost?.length} posts</Text>
        <Text
          onClick={() => {
            onOpen();
            setUserList("followers");
          }}
        >
          {followers?.length} follower
        </Text>
        <Text
          onClick={() => {
            onOpen();
            setUserList("following");
          }}
        >
          {following?.length} following
        </Text>
      </HStack>
      <Divider />
      <Divider />
      <Tabs isLazy defaultIndex={0} w={"100%"}>
        <TabList justifyContent={"center"}>
          <Tab flexGrow={1} colorScheme="blue">
            <Box as={MdGridOn} fontSize={"1.7rem"} />
          </Tab>
          {currentUserCheck && (
            <>
              <Tab flexGrow={1}>
                <Box as={AiOutlineHeart} fontSize={"1.7rem"} />
              </Tab>
              <Tab flexGrow={1}>
                <Box as={FaRegBookmark} fontSize={"1.5rem"} />
              </Tab>
            </>
          )}
        </TabList>
        <TabPanels>
          <TabPanel p="0">
            <GridBox showingPost={userAllPost} />
          </TabPanel>
          <TabPanel p="0">
            <GridBox showingPost={likedPosts} />
          </TabPanel>
          <TabPanel p="0">
            <Flex justify={"center"} fontSize={"sm"} p="0.5rem" color="gray">
              Only you can see what you've saved
            </Flex>
            <GridBox showingPost={bookmarkPosts} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <UserListModal
        onClose={onClose}
        isOpen={isOpen}
        users={userList === "followers" ? followers : following}
        heading={userList === "followers" ? "Followers" : "Following"}
      />
    </Flex>
  ) : (
    <ProfileSkeleton />
  );
};
