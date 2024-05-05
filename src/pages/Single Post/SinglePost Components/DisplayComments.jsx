import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { usePost, useUser } from "../../../contexts";
import { getRelativeTime } from "../../../utils/Utils";
import { InfoPopup } from "../../../components/index";
import {
  commentTextStyle,
  displayCommentMainBox,
} from "../../../styles/SinglePostStyle";
import { postNavStyles, postThreeDot } from "../../../styles/PostBoxStyles";
import { BsThreeDots } from "../../../utils/Icons";
import { simpleButton } from "../../../styles/GlobalStyles";
import { useSelector } from "react-redux";

export const DisplayComments = ({ post, location }) => {
  const { username, avatarURL, comments, createdAt, content } = post;

  const navigate = useNavigate();

  const infoPopupDisclosure = useDisclosure();
  const commentDeleteDisclosure = useDisclosure();
  const { colorMode } = useColorMode();

  const { currentUser } = useSelector((state) => state.authentication);
  const { handleFollow } = useUser();
  const { handleDeleteComment } = usePost();
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
        <Button {...postThreeDot} onClick={infoPopupDisclosure.onOpen}>
          <Box as={BsThreeDots} cursor={"pointer"} />
        </Button>
      </Flex>
      <Flex {...postNavStyles} w={"100%"}>
        <Flex gap={4} cursor={"pointer"} title={username}>
          <Avatar
            size="md"
            src={avatarURL}
            onClick={() => navigate(`/profile/${username}`)}
            cursor={"pointer"}
          />
          <VStack alignItems={"flex-start"}>
            <Flex alignItems={"center"} gap={4}>
              <Text
                fontWeight="semibold"
                onClick={() => navigate(`/profile/${username}`)}
                cursor={"pointer"}
              >
                {username}
              </Text>
              <Text fontSize="sm" color={"#717171e0"}>
                {getRelativeTime(createdAt)}
              </Text>
            </Flex>
            <Text fontWeight={0}>{content}</Text>
          </VStack>
        </Flex>
      </Flex>
      <VStack
        bg={colorMode === "dark" ? "black.900" : "white.500"}
        {...displayCommentMainBox}
      >
        {comments?.length === 0 ? (
          <Text h="100px" textAlign="center" w="100%" pt="4rem" color="gray">
            No Comments Yet
          </Text>
        ) : (
          comments?.map((comment) => {
            const { _id, avatarURL, text, createdAt, username } = comment;
            return (
              <Flex key={_id} gap={"1rem"} title={username}>
                <Box pt={"4"} onClick={() => navigate(`/profile/${username}`)}>
                  <Avatar src={avatarURL} size={"sm"} cursor={"pointer"} />
                </Box>
                <VStack align={"flex-start"} gap={"0"}>
                  <Flex gap={"0.5rem"} align={"center"}>
                    <Text
                      fontWeight={"bold"}
                      cursor={"pointer"}
                      onClick={() => navigate(`/profile/${username}`)}
                    >
                      {username}
                    </Text>
                    <Text fontSize="sm" color={"#717171e0"}>
                      {getRelativeTime(createdAt)}
                    </Text>
                    {currentUser.username === username && (
                      <Box
                        as={BsThreeDots}
                        onClick={commentDeleteDisclosure.onOpen}
                      />
                    )}
                  </Flex>
                  <Text
                    {...commentTextStyle}
                    color={colorMode === "dark" ? "#d7d7d7" : "black"}
                  >
                    {text}
                  </Text>
                </VStack>
                {commentDeleteDisclosure.isOpen && (
                  <Modal
                    onClose={commentDeleteDisclosure.onClose}
                    size={"xs"}
                    isOpen={commentDeleteDisclosure.isOpen}
                  >
                    <ModalOverlay />
                    <ModalContent
                      bg={colorMode === "dark" ? "black.700" : "white.500"}
                      mt={"20rem"}
                    >
                      <ModalBody>
                        <Button
                          sx={simpleButton}
                          color={"red.500"}
                          onClick={() => {
                            handleDeleteComment(_id, post._id);
                            commentDeleteDisclosure.onClose();
                          }}
                        >
                          Delete
                        </Button>
                        <Divider />
                        <Button
                          sx={simpleButton}
                          onClick={commentDeleteDisclosure.onClose}
                        >
                          Cancel
                        </Button>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                )}
              </Flex>
            );
          })
        )}
      </VStack>
      {infoPopupDisclosure.isOpen && (
        <InfoPopup
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
