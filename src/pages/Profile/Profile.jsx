import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Box,
  Divider,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Button,
  VStack,
  Heading,
} from "@chakra-ui/react";

import { useAuth, usePost, useUser } from "../../contexts";
import { SET_SELECTED_USER } from "../../utils/Constants";
import GridBox from "./Profile Components/GridBox";
import ProfileSkeleton from "./Profile Components/ProfileSkeleton";
import {
  MdGridOn,
  FaRegBookmark,
  AiOutlineHeart,
  CiCamera,
} from "../../utils/Icons";
import ProfileDetail from "./Profile Components/ProfileDetail";

export const Profile = () => {
  const paramUser = useParams();

  const {
    handleSingleUser,
    userState: { selectedUser, defaultTab },
    userDispatch,
  } = useUser();
  const {
    getAllUserPosts,
    postState: { posts, userAllPost },
  } = usePost();
  const { progress, currentUser } = useAuth();

  const { username, bookmarks } = selectedUser;

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

    return () => {
      userDispatch({ type: SET_SELECTED_USER, payload: null });
    };
  }, [paramUser.username, currentUser]);

  return progress === 100 ? (
    <Flex
      direction="column"
      mb={{ base: "4.2rem", md: "0.4rem" }}
      w="100%"
      p={{ base: 0, md: "1rem" }}
      maxW={"975px"}
      margin={"0 auto"}
    >
      <ProfileDetail
        selectedUser={selectedUser}
        currentUserCheck={currentUserCheck}
        userAllPost={userAllPost}
      />
      <Divider />
      <Tabs isLazy defaultIndex={defaultTab} w={"100%"}>
        <TabList
          justifyContent={"center"}
          w={{ base: "100%", md: "70%" }}
          maxW={"483px"}
          m="auto"
          border={"none"}
        >
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
            {userAllPost?.length === 0 ? (
              <VStack justifyContent="center" height="300px" gap={"4"}>
                <Box
                  as={CiCamera}
                  color={"gray"}
                  fontSize="7rem"
                  border={"1px solid gray"}
                  borderRadius="50%"
                  p="1rem"
                />
                <Heading>Share photos</Heading>
                <Text>
                  When you share photos, they will appear on your profile.
                </Text>
                <Button variant={"link-button"}>Share your first photo</Button>
              </VStack>
            ) : (
              <GridBox showingPost={userAllPost} />
            )}
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
    </Flex>
  ) : (
    <ProfileSkeleton />
  );
};
