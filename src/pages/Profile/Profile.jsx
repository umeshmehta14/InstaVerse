import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Flex,
  Box,
  Divider,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import { useAuth, usePost, useUser } from "../../contexts";
import { SET_SELECTED_USER } from "../../utils/Constants";
import GridBox from "./Profile Components/GridBox";
import ProfileSkeleton from "./Profile Components/ProfileSkeleton";
import { MdGridOn, FaRegBookmark, AiOutlineHeart } from "../../utils/Icons";
import ProfileDetail from "./Profile Components/ProfileDetail";

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

  const { _id, username, bookmarks } = selectedUser;

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
      <Tabs isLazy defaultIndex={0} w={"100%"}>
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
    </Flex>
  ) : (
    <ProfileSkeleton />
  );
};
