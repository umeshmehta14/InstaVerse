import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useAuth } from "../../../contexts";
import { UserListModal } from "../../../components";
import { followedByUser } from "../../../styles/GlobalStyles";
import { getMutualFollowers } from "../../../utils/MutualFollowers";
import { FiLogOut } from "../../../utils/Icons";
import EditProfileModal from "./EditProfileModal";

const ProfileDetail = ({ selectedUser, currentUserCheck, userAllPost }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editModalDisclosure = useDisclosure();

  const { logoutHandler, currentUser } = useAuth();
  const [userList, setUserList] = useState("");

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
  return (
    <>
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
            mb={{ base: 2, md: 0 }}
            align={"center"}
            gap={"4"}
            width={{ base: "auto", md: "40%" }}
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
                  onClick={editModalDisclosure.onOpen}
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
            <Text
              onClick={() => {
                onOpen();
                setUserList("followers");
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
      <UserListModal
        onClose={onClose}
        isOpen={isOpen}
        users={userList === "followers" ? followers : following}
        heading={userList === "followers" ? "Followers" : "Following"}
      />
      <EditProfileModal
        onOpen={editModalDisclosure.onOpen}
        isOpen={editModalDisclosure.isOpen}
        onClose={editModalDisclosure.onClose}
      />
    </>
  );
};

export default ProfileDetail;
