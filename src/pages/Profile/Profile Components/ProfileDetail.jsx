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

import { useUser } from "../../../contexts";
import {
  RotatingLoader,
  UnfollowModal,
  UserListModal,
} from "../../../components";
import { getMutualFollowers } from "../../../utils/Utils";
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
import { useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "../../Authentication/authenticationSlice";
import { handleFollowUnfollowUser } from "../../Post Feed/userSlice";
import { useEffect } from "react";

export const ProfileDetail = ({ selectedUser, currentUserCheck }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editModalDisclosure = useDisclosure();
  const unfollowModalDisclosure = useDisclosure();
  const { colorMode } = useColorMode();

  const { currentUser } = useSelector((state) => state.authentication);
  const { loadingUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    userState: { userList },
    userDispatch,
  } = useUser();

  const {
    _id,
    username,
    fullName,
    avatar,
    bio,
    posts,
    following,
    follower,
    portfolio,
  } = selectedUser || {};

  const mutualFollowers =
    !currentUserCheck && getMutualFollowers(follower, currentUser);

  const isFollowing =
    !currentUserCheck &&
    currentUser.following?.some((user) => user?._id === _id || user === _id);

  const checkFollowing = currentUser?.follower?.some(
    (user) => user?._id === _id || user === _id
  );

  const isLoading = loadingUsers.includes(_id);

  useEffect(() => {}, [currentUser, selectedUser]);

  return (
    <>
      <Flex {...profileDetailMain}>
        <Avatar size={{ base: "xl", md: "2xl" }} src={avatar?.url} />
        <Flex {...profileButtonMain}>
          <Flex {...profileUsernameStyle}>
            <Text>{username}</Text>
            {currentUserCheck && (
              <Box
                as={FiLogOut}
                fontSize={"1.4rem"}
                cursor={"pointer"}
                onClick={() => dispatch(logoutHandler())}
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
                  onClick={() =>
                    dispatch(handleFollowUnfollowUser({ _id, follow: true }))
                  }
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
              <Text>{posts?.length} posts</Text>
              <Text
                cursor={"pointer"}
                onClick={() => {
                  onOpen();
                  userDispatch({ type: SET_USER_LIST, payload: "followers" });
                }}
              >
                {follower?.length} follower
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
              <Text>{` ${fullName}`}</Text>
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
                  <Text
                    p="0"
                    onClick={() => {
                      onOpen();
                      userDispatch({
                        type: SET_USER_LIST,
                        payload: "followers",
                      });
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
          </Flex>
        </Flex>
      </Flex>

      <Flex {...mobileBioStyle}>
        <Text>{` ${fullName}`}</Text>
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
        <Text>{posts?.length} posts</Text>
        <Text
          cursor={"pointer"}
          onClick={() => {
            onOpen();
            userDispatch({ type: SET_USER_LIST, payload: "followers" });
          }}
        >
          {follower?.length} follower
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
          users={userList === "followers" ? follower : following}
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
        />
      )}
    </>
  );
};
