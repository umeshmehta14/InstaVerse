import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Flex,
  Box,
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
import { useNavigate } from "react-router-dom";

import { getUserBookmark, getUserLikedPosts } from "../../Post Feed/userSlice";
import { emptyCameraStyles, tabListStyle } from "../../../styles/ProfileStyles";
import { useUser } from "../../../contexts";
import {
  AiOutlineHeart,
  BsBookmarkX,
  BsFillHeartbreakFill,
  CiCamera,
  FaRegBookmark,
  MdGridOn,
} from "../../../utils/Icons";
import { RotatingLoader } from "../../../components";
import { GridBox } from "./GridBox";

const UserProfileTabs = ({ currentUserCheck, postModalDisclosure }) => {
  const { selectedUser, bookmarks, isLoading, likedPosts } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    userState: { defaultTab },
  } = useUser();
  return (
    <Tabs isLazy defaultIndex={defaultTab} w={"100%"}>
      <TabList {...tabListStyle}>
        <Tab flexGrow={1} colorScheme="blue" gap={2}>
          <Box as={MdGridOn} fontSize={"1.7rem"} />
          <Text display={{ base: "none", md: "block" }}>Posts</Text>
        </Tab>
        {currentUserCheck && (
          <>
            <Tab
              flexGrow={1}
              gap={2}
              onClick={() => dispatch(getUserLikedPosts())}
            >
              <Box as={AiOutlineHeart} fontSize={"1.7rem"} />
              <Text display={{ base: "none", md: "block" }}>Likes</Text>
            </Tab>
            <Tab
              flexGrow={1}
              gap={2}
              onClick={() => dispatch(getUserBookmark())}
            >
              <Box as={FaRegBookmark} fontSize={"1.5rem"} />
              <Text display={{ base: "none", md: "block" }}>Saved</Text>
            </Tab>
          </>
        )}
      </TabList>
      <TabPanels>
        <TabPanel p="0">
          {currentUserCheck ? (
            selectedUser?.posts?.length === 0 ? (
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
              <GridBox showingPost={selectedUser?.posts} />
            )
          ) : (
            <VStack minH={"30vh"} fontSize={"4rem"} gap={"2rem"}>
              <Box as={CiCamera} {...emptyCameraStyles} />
              <Heading>No posts yet</Heading>
            </VStack>
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
          ) : isLoading ? (
            <Flex justifyContent={"center"} alignItems={"center"} minH={"30vh"}>
              <RotatingLoader w={"50"} sw={"3"} />
            </Flex>
          ) : (
            <GridBox showingPost={likedPosts} />
          )}
        </TabPanel>
        <TabPanel p="0">
          <Flex justify={"center"} fontSize={"sm"} p="0.5rem" color="gray">
            Only you can see what you've saved
          </Flex>
          {bookmarks?.length === 0 ? (
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
          ) : isLoading ? (
            <Flex justifyContent={"center"} alignItems={"center"} minH={"30vh"}>
              <RotatingLoader w={"50"} sw={"3"} />
            </Flex>
          ) : (
            <GridBox showingPost={bookmarks} />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UserProfileTabs;
