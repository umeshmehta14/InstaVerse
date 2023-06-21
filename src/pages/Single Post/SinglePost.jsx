import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  VStack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { useAuth, usePost, useUser } from "../../contexts";
import {
  AiOutlineArrowLeft,
  BsEmojiSunglasses,
  BsThreeDots,
} from "../../utils/Icons";
import { postNavStyles, postThreeDot } from "../../styles/PostBoxStyles";
import InfoPopup from "../../components/Post Box/PostBox Components/InfoPopup";
import { useState } from "react";
import { getRelativeTime } from "../../utils/GetRelativeTime";

export const SinglePost = () => {
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { onClose } = useDisclosure();
  const infoPopupDisclosure = useDisclosure();
  const { colorMode } = useColorMode();

  const [clicked, setClicked] = useState();
  const [commentValue, setCommentValue] = useState("");

  const {
    HandleSinglePost,
    HandleCreateComment,
    postState: { singlePost },
  } = usePost();
  const { currentUser } = useAuth();
  const { handleFollow } = useUser();

  const { _id, username, comments, mediaUrl, createdAt, content, avatarURL } =
    singlePost;

  const postFollow = currentUser?.following?.find(
    (user) => user?.username === username
  );

  const handleCommentPost = () => {
    HandleCreateComment(commentValue, _id);
    setCommentValue("");
  };

  useEffect(() => {
    HandleSinglePost(postId);
  }, [postId, comments]);

  return (
    <>
      <Modal
        onClose={onClose}
        size={{ base: "full", md: "lg", lg: "xl" }}
        isOpen={true}
        maxW={"auto"}
      >
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "dark" ? "black.900" : "white.500"}
          p={0}
          maxW={"896px !important"}
          w={"100%"}
          maxH={{ base: "auto", md: "750px" }}
        >
          <ModalCloseButton
            display={{ base: "none", md: "flex" }}
            pos={"absolute"}
            right={"0"}
            top={"-3rem"}
            onClick={() => navigate(location?.state?.from?.pathname)}
          />
          <ModalBody p={0} height={"100%"}>
            <HStack align={"flex-start"} height={"600px"}>
              <Flex
                display={{ base: "none", md: "flex" }}
                height={"100%"}
                flex={1}
                alignItems={"center"}
              >
                <Image
                  src={mediaUrl}
                  fallbackSrc="https://tse4.mm.bing.net/th?id=OIP.y0vjVCLBEYW5ANsy2YHhGgHaCe&pid=Api&P=0&h=180"
                  w={"100%"}
                  height={"100%"}
                />
              </Flex>
              <Flex
                flexDir={"column"}
                gap={"0.5rem"}
                width={"100%"}
                maxW={"400px"}
              >
                <HStack
                  p="0.5rem"
                  align={"center"}
                  gap={"1rem"}
                  display={{ base: "flex", md: "none" }}
                >
                  <Box
                    as={AiOutlineArrowLeft}
                    fontSize={"1.8rem"}
                    onClick={() => navigate(location?.state?.from?.pathname)}
                  />
                  <Text>Comments</Text>
                </HStack>
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
                <Flex
                  py="1"
                  borderTop="1px solid gray"
                  alignItems={"center"}
                  w={"100%"}
                  display={{ base: "none", md: "flex" }}
                  bg={colorMode === "dark" ? "black.900" : "white.500"}
                >
                  <Box
                    as={BsEmojiSunglasses}
                    fontSize={"1.8rem"}
                    cursor="pointer"
                    ml="2"
                    title="Emoji"
                  />

                  <Input
                    placeholder="Add a comment..."
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                    border={"none"}
                    flex="1"
                    mr="2"
                    _focus={{
                      outline: "none",
                      boxShadow: "none",
                      border: "none",
                    }}
                  />
                  <Button
                    fontSize={"1rem"}
                    variant={"link-button"}
                    size="sm"
                    onClick={() =>
                      commentValue !== "" ? handleCommentPost() : ""
                    }
                    color={commentValue === "" ? "gray" : null}
                  >
                    Post
                  </Button>
                </Flex>
              </Flex>
            </HStack>
          </ModalBody>
          <ModalFooter
            p="0"
            justifyContent={"flex-start"}
            display={{ base: "flex", md: "none" }}
            bg={colorMode === "dark" ? "black.900" : "white.500"}
            pos={"fixed"}
            bottom={0}
            width={"100%"}
          >
            <Flex
              py="1"
              borderTop="1px solid gray"
              alignItems={"center"}
              w={"100%"}
            >
              <Box
                as={BsEmojiSunglasses}
                fontSize={"1.8rem"}
                cursor="pointer"
                ml="2"
                title="Emoji"
              />

              <Input
                placeholder="Add a comment..."
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                border={"none"}
                flex="1"
                mr="2"
                _focus={{ outline: "none", boxShadow: "none", border: "none" }}
              />
              <Button
                fontSize={"1rem"}
                variant={"link-button"}
                size="sm"
                onClick={() => (commentValue !== "" ? handleCommentPost() : "")}
                color={commentValue === "" ? "gray" : undefined}
              >
                Post
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {infoPopupDisclosure.isOpen && (
        <InfoPopup
          setClicked={setClicked}
          clicked={clicked}
          isOpen={infoPopupDisclosure.isOpen}
          onClose={infoPopupDisclosure.onClose}
          post={singlePost}
        />
      )}
    </>
  );
};
