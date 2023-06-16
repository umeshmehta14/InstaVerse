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
} from "@chakra-ui/react";

import { useAuth, usePost, useUser } from "../../contexts";
import { SET_SELECTED_USER } from "../../utils/Constants";
import GridBox from "./Profile Components/GridBox";
import ProfileSkeleton from "./Profile Components/ProfileSkeleton";

export const Profile = () => {
  const navigate = useNavigate();
  const paramUser = useParams();

  const {
    handleSingleUser,
    userState: { selectedUser },
    userDispatch,
  } = useUser();
  const {
    getAllUserPosts,
    postState: { posts, userAllPost },
  } = usePost();
  const { progress, currentUser } = useAuth();

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

  useEffect(() => {
    getAllUserPosts(paramUser.username);
    handleSingleUser(paramUser.username);
    if (_id?.length === 0) {
      navigate("/");
    }
    return () => {
      userDispatch({ type: SET_SELECTED_USER, payload: null });
    };
  }, []);

  return progress === 100 ? (
    <Flex direction="column" align="center">
      <Flex justifyContent="space-evenly" alignItems="center" width="100%">
        <Avatar size="xl" src={avatarURL} alt="Profile Picture" />
        <Flex flexDir={"column"}>
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            {username}
          </Text>
          <Box>
            <Button variant={"follow-button"}>Follow</Button>
            {currentUser.username === username && (
              <Button variant="outline" size="sm" mr={2}>
                Edit Profile
              </Button>
            )}
          </Box>
        </Flex>
      </Flex>
      <Flex flexDir="column" w="100%" gap="0.1rem">
        <Text>{` ${firstName} ${lastName}`}</Text>
        <Text>{bio}</Text>
        <Text color={"blue.200"}>
          <Link to={portfolio}>{portfolio}</Link>
        </Text>
      </Flex>
      <HStack>
        <Text>Follower {followers?.length}</Text>
        <Text>Following {following?.length}</Text>
      </HStack>
      <Flex>
        <Button variant="outline" size="sm">
          Logout
        </Button>
      </Flex>

      <Divider my={4} />
      <Tabs isLazy w={"100%"}>
        <TabList justifyContent={"center"}>
          <Tab>Posts</Tab>
          {currentUser.username === username && (
            <>
              <Tab>Likes</Tab>
              <Tab>Saved</Tab>
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
            <GridBox showingPost={bookmarkPosts} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  ) : (
    <ProfileSkeleton />
  );
};
