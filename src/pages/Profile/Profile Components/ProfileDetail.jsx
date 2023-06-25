import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useAuth, useUser } from "../../../contexts";
import {
  RotatingLoader,
  UnfollowModal,
  UserListModal,
} from "../../../components";
import { getMutualFollowers } from "../../../utils/MutualFollowers";
import { EditProfileModal } from "../../index";
import {
  mobileBioStyle,
  mobileUserLength,
  pcBioStyle,
  profileButtonMain,
  profileDetailMain,
  profileFollowedByStyle,
  profileUsernameStyle,
  userPostLengthStyle,
} from "../../../styles/ProfileStyles";
import { followedByUser } from "../../../styles/GlobalStyles";
import { FiLogOut } from "../../../utils/Icons";
import { SET_USER_LIST } from "../../../utils/Constants";

export const ProfileDetail = ({
  selectedUser,
  currentUserCheck,
  userAllPost,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editModalDisclosure = useDisclosure();
  const unfollowModalDisclosure = useDisclosure();
  const { colorMode } = useColorMode();

  const { logoutHandler, currentUser } = useAuth();
  const {
    userState: { loadingUsers, userList },
    handleFollowUser,
    userDispatch,
  } = useUser();

  const {
    username,
    firstName,
    lastName,
    avatarURL,
    bio,
    following,
    followers,
    portfolio,
  } = selectedUser;

  const mutualFollowers =
    !currentUserCheck && getMutualFollowers(followers, currentUser);

  const isFollowing =
    !currentUserCheck &&
    currentUser.following.find((user) => user.username === username);

  const checkFollowing = currentUser.followers.find(
    (user) => user.username === username
  );

  const isLoading = loadingUsers.includes(username);

  return (
    <>
      <Flex {...profileDetailMain}>
        <Avatar size={{ base: "xl", md: "2xl" }} src={avatarURL} />
        <Flex {...profileButtonMain}>
          <Flex {...profileUsernameStyle}>
            <Text>{username}</Text>
            {currentUserCheck && (
              <Box
                as={FiLogOut}
                fontSize={"1.4rem"}
                cursor={"pointer"}
                onClick={logoutHandler}
                title="Logout"
              />
            )}
          </Flex>
          <Flex alignItems={"center"}>
            {!currentUserCheck &&
              (isFollowing ? (
                <Button
                  variant={"following-button"}
                  title="Unfollow"
                  onClick={unfollowModalDisclosure.onOpen}
                >
                  {isLoading ? <RotatingLoader w="20" sw={"7"} /> : "Unfollow"}
                </Button>
              ) : (
                <Button
                  variant={"follow-button"}
                  title="Follow"
                  onClick={() => handleFollowUser(username)}
                >
                  {isLoading ? (
                    <RotatingLoader w="20" sw={"7"} />
                  ) : checkFollowing ? (
                    "Follow Back"
                  ) : (
                    "Follow"
                  )}
                </Button>
              ))}
            {currentUserCheck && (
              <>
                <Button
                  variant="following-button"
                  mr={2}
                  w="100%"
                  title="Edit Profile"
                  onClick={editModalDisclosure.onOpen}
                >
                  Edit Profile
                </Button>
              </>
            )}
          </Flex>
          <Flex flexDir={"column"} display={{ base: "none", md: "flex" }}>
            <HStack {...userPostLengthStyle}>
              <Text>{userAllPost?.length} posts</Text>
              <Text
                cursor={"pointer"}
                onClick={() => {
                  onOpen();
                  userDispatch({ type: SET_USER_LIST, payload: "followers" });
                }}
              >
                {followers?.length} follower
              </Text>
              <Text
                cursor={"pointer"}
                onClick={() => {
                  onOpen();
                  userDispatch({ type: SET_USER_LIST, payload: "following" });
                }}
              >
                {following?.length} following
              </Text>
            </HStack>
            <Flex {...pcBioStyle}>
              <Text>{` ${firstName} ${lastName}`}</Text>
              <Text>{bio}</Text>
              <Text color={colorMode === "dark" ? "blue.200" : "blue.500"}>
                <Link to={portfolio}>{portfolio}</Link>
              </Text>
            </Flex>
            {!currentUserCheck && (
              <Flex
                sx={followedByUser}
                {...profileFollowedByStyle}
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
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>

      <Flex {...mobileBioStyle}>
        <Text>{` ${firstName} ${lastName}`}</Text>
        <Text>{bio}</Text>
        <Text color={colorMode === "dark" ? "blue.200" : "blue.500"}>
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
            <Text
              onClick={() => {
                onOpen();
                userDispatch({ type: SET_USER_LIST, payload: "followers" });
              }}
            >
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
        </Flex>
      )}

      <Divider />
      <HStack {...mobileUserLength}>
        <Text>{userAllPost?.length} posts</Text>
        <Text
          cursor={"pointer"}
          onClick={() => {
            onOpen();
            userDispatch({ type: SET_USER_LIST, payload: "followers" });
          }}
        >
          {followers?.length} follower
        </Text>
        <Text
          cursor={"pointer"}
          onClick={() => {
            onOpen();
            userDispatch({ type: SET_USER_LIST, payload: "following" });
          }}
        >
          {following?.length} following
        </Text>
      </HStack>
      {isOpen && (
        <UserListModal
          onClose={onClose}
          isOpen={isOpen}
          users={userList === "followers" ? followers : following}
          heading={userList === "followers" ? "Followers" : "Following"}
        />
      )}
      {editModalDisclosure.isOpen && (
        <EditProfileModal
          isOpen={editModalDisclosure.isOpen}
          onClose={editModalDisclosure.onClose}
        />
      )}
      {unfollowModalDisclosure.isOpen && (
        <UnfollowModal
          isOpen={unfollowModalDisclosure.isOpen}
          onClose={unfollowModalDisclosure.onClose}
          {...selectedUser}
          handleFollowUser={handleFollowUser}
        />
      )}
    </>
  );
};
