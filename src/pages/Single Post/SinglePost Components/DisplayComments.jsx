import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  VStack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { postNavStyles, postThreeDot } from "../../../styles/PostBoxStyles";
import { getRelativeTime } from "../../../utils/GetRelativeTime";
import InfoPopup from "../../../components/Post Box/PostBox Components/InfoPopup";
import { useAuth, useUser } from "../../../contexts";
import { BsThreeDots } from "../../../utils/Icons";

const DisplayComments = ({ post, location }) => {
  const { username, avatarURL, comments, createdAt, content } = post;

  const infoPopupDisclosure = useDisclosure();
  const { colorMode } = useColorMode();

  const [clicked, setClicked] = useState();
  const { currentUser } = useAuth();
  const { handleFollow } = useUser();
  const postFollow = currentUser?.following?.find(
    (user) => user?.username === username
  );

  return (
    <>
      <Flex {...postNavStyles} display={{ base: "none", md: "flex" }}>
        <Flex alignItems={"center"} gap={2}>
          <Flex
            alignItems={"center"}
            cursor={"pointer"}
            title={username}
            onClick={() => navigate(`/profile/${username}`)}
          >
            <Avatar size="sm" src={avatarURL} />
            <Text ml="2" fontWeight="semibold">
              {username}
            </Text>
          </Flex>
          {!postFollow && !(currentUser.username === username) && (
            <Button
              alignItems={"center"}
              variant={"link-button"}
              justifyContent="flex-start"
              onClick={() => handleFollow(username)}
            >
              Follow
            </Button>
          )}
        </Flex>
        <Button
          {...postThreeDot}
          _hover={{ color: "gray", bg: "transparent" }}
          onClick={infoPopupDisclosure.onOpen}
        >
          <Box as={BsThreeDots} cursor={"pointer"} />
        </Button>
      </Flex>
      <Flex {...postNavStyles} w={"100%"}>
        <Flex
          gap={4}
          cursor={"pointer"}
          title={username}
          onClick={() => navigate(`/profile/${username}`)}
        >
          <Avatar size="md" src={avatarURL} />
          <VStack alignItems={"flex-start"}>
            <Flex alignItems={"center"} gap={4}>
              <Text fontWeight="semibold">{username}</Text>
              <Text fontSize="sm" color={"#717171e0"}>
                {getRelativeTime(createdAt)}
              </Text>
            </Flex>
            <Text fontWeight={0}>{content}</Text>
          </VStack>
        </Flex>
      </Flex>
      <VStack
        flexDir={"column"}
        p="0.5rem"
        align={"flex-start"}
        gap={"1rem"}
        w="100%"
        maxH={{ base: "none", md: "390px" }}
        minH={{ base: "none", md: "390px" }}
        overflow={"auto"}
        mb={{ base: "3rem", md: "0" }}
        bg={colorMode === "dark" ? "black.900" : "white.500"}
      >
        {comments?.map((comment) => {
          const { avatarURL, text, createdAt, username } = comment;
          return (
            <Flex gap={"1rem"}>
              <Box pt={"4"}>
                <Avatar src={avatarURL} size={"sm"} />
              </Box>
              <VStack align={"flex-start"} gap={"0"}>
                <Flex gap={"0.5rem"} align={"center"}>
                  <Text>{username}</Text>
                  <Text fontSize="sm" color={"#717171e0"}>
                    {getRelativeTime(createdAt)}
                  </Text>
                </Flex>
                <Text fontWeight={0} color={"#d7d7d7"}>
                  {text}
                </Text>
              </VStack>
            </Flex>
          );
        })}
      </VStack>
      {infoPopupDisclosure.isOpen && (
        <InfoPopup
          setClicked={setClicked}
          clicked={clicked}
          isOpen={infoPopupDisclosure.isOpen}
          onClose={infoPopupDisclosure.onClose}
          post={post}
          fromSinglePost={true}
          location={location}
        />
      )}
    </>
  );
};

export default DisplayComments;
