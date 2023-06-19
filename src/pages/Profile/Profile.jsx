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
import { UserListModal } from "../../components";
import {
  FiLogOut,
  MdGridOn,
  FaRegBookmark,
  AiOutlineHeart,
} from "../../utils/Icons";
import { useState } from "react";
import { getMutualFollowers } from "../../utils/MutualFollowers";
import { followedByUser } from "../../styles/GlobalStyles";

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

  const mutualFollowers =
    !currentUserCheck && getMutualFollowers(followers, currentUser);

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
      <Flex
        alignItems="center"
        width="100%"
        gap={{ base: "1rem", md: "4rem" }}
        p="1rem"
        ml={{ base: 0, lg: "5rem" }}
        pb={{ lg: "0" }}
      >
        <Avatar size={{ base: "xl", md: "2xl" }} src={avatarURL} />
        <Flex
          flexDir={{ base: "column", md: "row" }}
          gap={"0.5rem"}
          flexWrap="wrap"
          maxW="613px"
          padding={"1rem"}
        >
          <Flex
            fontSize="2xl"
            fontWeight="bold"
            mb={2}
            align={"center"}
            gap={"4"}
            width={{ base: "auto", md: "30%" }}
          >
            <Text>{username}</Text>
            <Box
              as={FiLogOut}
              fontSize={"1.4rem"}
              onClick={logoutHandler}
              cursor={"pointer"}
              title="Logout"
            />
          </Flex>
          <Flex alignItems={"center"}>
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
          </Flex>
          <Flex flexDir={"column"} display={{ base: "none", md: "flex" }}>
            <HStack
              w="100%"
              maxW={"400px"}
              justifyContent="space-between"
              p={"0.5rem 0"}
            >
              <Text>{userAllPost?.length} posts</Text>
              <Text
                cursor={"pointer"}
                onClick={() => {
                  onOpen();
                  setUserList("followers");
                }}
              >
                {followers?.length} follower
              </Text>
              <Text
                cursor={"pointer"}
                onClick={() => {
                  onOpen();
                  setUserList("following");
                }}
              >
                {following?.length} following
              </Text>
            </HStack>
            <Flex flexDir="column" w="100%" gap="0.4rem" pt={0}>
              <Text>{` ${firstName} ${lastName}`}</Text>
              <Text>{bio}</Text>
              <Text color={"blue.200"}>
                <Link to={portfolio}>{portfolio}</Link>
              </Text>
            </Flex>
            {!currentUserCheck && (
              <Flex
                sx={followedByUser}
                fontSize={"sm"}
                cursor={"pointer"}
                p="0.5rem 0rem!important"
                display={{ base: "none", md: "flex" }}
                onClick={onOpen}
              >
                {mutualFollowers && mutualFollowers?.length > 0 && (
                  <Text p="0">
                    Followed by{" "}
                    {mutualFollowers
                      ?.slice(0, 2)
                      ?.map((follower) => follower.username)
                      ?.join(", ")}
                    {mutualFollowers?.length > 2 && (
                      <> and +{mutualFollowers?.length - 2} more</>
                    )}
                  </Text>
                )}
                <UserListModal
                  onClose={onClose}
                  isOpen={isOpen}
                  users={followers}
                  heading={"Followers"}
                />
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flexDir="column"
        w="100%"
        display={{ base: "flex", md: "none" }}
        gap="0.1rem"
        p={"0.5rem 1rem"}
        pt={0}
      >
        <Text>{` ${firstName} ${lastName}`}</Text>
        <Text>{bio}</Text>
        <Text color={"blue.200"}>
          <Link to={portfolio}>{portfolio}</Link>
        </Text>
      </Flex>
      {!currentUserCheck && (
        <Flex
          sx={followedByUser}
          display={{ base: "flex", md: "none" }}
          fontSize={"sm"}
          onClick={onOpen}
        >
          {mutualFollowers && mutualFollowers?.length > 0 && (
            <Text>
              Followed by{" "}
              {mutualFollowers
                ?.slice(0, 2)
                ?.map((follower) => follower.username)
                ?.join(", ")}
              {mutualFollowers?.length > 2 && (
                <> and +{mutualFollowers?.length - 2} more</>
              )}
            </Text>
          )}
          <UserListModal
            onClose={onClose}
            isOpen={isOpen}
            users={followers}
            heading={"Followers"}
          />
        </Flex>
      )}

      <Divider />
      <HStack
        w="100%"
        justifyContent="space-around"
        p="1rem"
        display={{ base: "flex", md: "none" }}
      >
        <Text>{userAllPost?.length} posts</Text>
        <Text
          cursor={"pointer"}
          onClick={() => {
            onOpen();
            setUserList("followers");
          }}
        >
          {followers?.length} follower
        </Text>
        <Text
          cursor={"pointer"}
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
