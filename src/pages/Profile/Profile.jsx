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
  Text,
  Button,
  VStack,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

import { usePost, useUser } from "../../contexts";
import { GridBox, ProfileSkeleton, ProfileDetail } from "../index";
import { PostModal } from "../../components";
import {
  emptyCameraStyles,
  profileMainBox,
  tabListStyle,
} from "../../styles/ProfileStyles";
import { SET_SELECTED_USER } from "../../utils/Constants";
import {
  MdGridOn,
  FaRegBookmark,
  AiOutlineHeart,
  CiCamera,
  BsFillHeartbreakFill,
  BsBookmarkX,
} from "../../utils/Icons";
import { useSelector } from "react-redux";

export const Profile = () => {
  const paramUser = useParams();
  const navigate = useNavigate();

  const postModalDisclosure = useDisclosure();

  const {
    handleSingleUser,
    userState: { selectedUser, defaultTab, userBookmarks },
    userDispatch,
  } = useUser();
  const {
    getAllUserPosts,
    postState: { posts, userAllPost },
  } = usePost();
  const { currentUser, progress } = useSelector(
    (state) => state.authentication
  );

  const { username } = selectedUser;
  document.title = `@${username}`;
  const currentUserCheck = currentUser.username === username;

  const likedPosts = currentUserCheck
    ? posts?.filter(({ likes }) =>
        likes.likedBy?.some((user) => user.username === username)
      )
    : [];

  const bookmarkPosts = currentUserCheck
    ? posts?.filter(({ _id }) => userBookmarks?.includes(_id))
    : [];

  useEffect(() => {
    getAllUserPosts(paramUser.username);
    handleSingleUser(paramUser.username);

    return () => {
      userDispatch({ type: SET_SELECTED_USER, payload: null });
    };
  }, [paramUser.username, currentUser, posts, defaultTab]);

  return progress === 100 ? (
    <Flex {...profileMainBox}>
      <ProfileDetail
        selectedUser={selectedUser}
        currentUserCheck={currentUserCheck}
        userAllPost={userAllPost}
      />
      <Divider />
      <Tabs isLazy defaultIndex={defaultTab} w={"100%"}>
        <TabList {...tabListStyle}>
          <Tab flexGrow={1} colorScheme="blue" gap={2}>
            <Box as={MdGridOn} fontSize={"1.7rem"} />
            <Text display={{ base: "none", md: "block" }}>Posts</Text>
          </Tab>
          {currentUserCheck && (
            <>
              <Tab flexGrow={1} gap={2}>
                <Box as={AiOutlineHeart} fontSize={"1.7rem"} />
                <Text display={{ base: "none", md: "block" }}>Likes</Text>
              </Tab>
              <Tab flexGrow={1} gap={2}>
                <Box as={FaRegBookmark} fontSize={"1.5rem"} />
                <Text display={{ base: "none", md: "block" }}>Saved</Text>
              </Tab>
            </>
          )}
        </TabList>
        <TabPanels>
          <TabPanel p="0">
            {userAllPost?.length === 0 ? (
              <VStack justifyContent="center" height="300px" gap={"4"}>
                <Box as={CiCamera} {...emptyCameraStyles} />
                <Heading>Share photos</Heading>
                <Text textAlign={"center"}>
                  When you share photos, they will appear on your profile.
                </Text>
                <Button
                  variant={"link-button"}
                  onClick={postModalDisclosure.onOpen}
                >
                  Share your first photo
                </Button>
              </VStack>
            ) : (
              <GridBox showingPost={userAllPost} />
            )}
          </TabPanel>
          <TabPanel p="0">
            {likedPosts.length === 0 ? (
              <VStack height={"300px"} gap={"4"} my={"1rem"}>
                <Box as={BsFillHeartbreakFill} color={"gray"} fontSize="5rem" />
                <Text w="100%" maxW={"90%"} textAlign={"center"}>
                  Your liked posts list is empty. Begin discovering and liking
                  posts to populate it.
                </Text>
                <Button
                  variant={"follow-button"}
                  onClick={() => navigate("/explore")}
                >
                  Start Liking
                </Button>
              </VStack>
            ) : (
              <GridBox showingPost={likedPosts} />
            )}
          </TabPanel>
          <TabPanel p="0">
            <Flex justify={"center"} fontSize={"sm"} p="0.5rem" color="gray">
              Only you can see what you've saved
            </Flex>
            {bookmarkPosts?.length === 0 ? (
              <VStack height={"300px"} gap={"4"} my={"1rem"}>
                <Box as={BsBookmarkX} color={"gray"} fontSize="5rem" />
                <Text w="100%" maxW={"90%"} textAlign={"center"}>
                  Your bookmarked posts list is waiting for you to add content.
                  Start saving your favorites!
                </Text>
                <Button
                  variant={"follow-button"}
                  onClick={() => navigate("/explore")}
                >
                  Begin Saving
                </Button>
              </VStack>
            ) : (
              <GridBox showingPost={bookmarkPosts} />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      {postModalDisclosure.isOpen && (
        <PostModal
          isOpen={postModalDisclosure.isOpen}
          onClose={postModalDisclosure.onClose}
        />
      )}
    </Flex>
  ) : (
    <ProfileSkeleton />
  );
};
