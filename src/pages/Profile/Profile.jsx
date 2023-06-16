import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
} from "@chakra-ui/react";

import { useAuth, usePost, useUser } from "../../contexts";
import { SET_SELECTED_USER } from "../../utils/Constants";
import PostSection from "./Profile Components/PostSection";
import ProfileSkeleton from "./Profile Components/ProfileSkeleton";

export const Profile = () => {
  const navigate = useNavigate();
  const paramUser = useParams();

  const {
    handleSingleUser,
    userState: { selectedUser },
    userDispatch,
  } = useUser();
  const { getAllUserPosts } = usePost();
  const { progress } = useAuth();

  const { _id, username, avatarURL, bio, following, followers } = selectedUser;

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
      <Box mb={4}>
        <Avatar size="xl" src={avatarURL} alt="Profile Picture" />
      </Box>

      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        {username}
      </Text>

      <Text fontSize="lg" color="gray.500" mb={4}>
        {bio}
      </Text>
      <Text>Follower {followers?.length}</Text>
      <Text>Following {following?.length}</Text>
      <Flex>
        <Button variant="outline" size="sm" mr={2}>
          Edit Profile
        </Button>
        <Button variant="outline" size="sm">
          Logout
        </Button>
      </Flex>

      <Divider my={4} />
      <Tabs w={"100%"}>
        <TabList justifyContent={"center"}>
          <Tab>Posts</Tab>
          <Tab>Likes</Tab>
          <Tab>Saved</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p="0">
            <PostSection />
          </TabPanel>
          <TabPanel>Likes</TabPanel>
          <TabPanel>Bookmarks</TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  ) : (
    <ProfileSkeleton />
  );
};
