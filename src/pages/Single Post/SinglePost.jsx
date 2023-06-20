import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Img,
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

  const {
    HandleSinglePost,
    postState: { singlePost },
  } = usePost();
  const { currentUser } = useAuth();
  const { handleFollow } = useUser();

  const { username, comments, mediaUrl, createdAt, content, avatarURL } =
    singlePost;

  const postFollow = currentUser?.following?.find(
    (user) => user?.username === username
  );

  useEffect(() => {
    HandleSinglePost(postId);
  }, [postId]);

  return (
    <>
      <Modal onClose={onClose} size={"full"} isOpen={true}>
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "dark" ? "black.900" : "white.500"}
          p={0}
        >
          <ModalCloseButton
            display={{ base: "none" }}
            onClick={() => navigate(location?.state?.from?.pathname)}
          />
          <ModalBody p={0}>
            <Flex flexDir={"column"} gap={"0.5rem"}>
              <HStack p="0.5rem" align={"center"} gap={"1rem"}>
                <Box
                  as={AiOutlineArrowLeft}
                  fontSize={"1.8rem"}
                  onClick={() => navigate(location?.state?.from?.pathname)}
                />
                <Text>Comments</Text>
              </HStack>
              <Flex {...postNavStyles} w={"100%"}>
                <Flex
                  // alignItems={"center"}
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
              >
                {comments?.map((comment) => {
                  const { avatarURL, text, createdAt, username } = comment;
                  return (
                    <Flex gap={"1rem"}>
                      <Box pt={"4"}>
                        <Avatar src={avatarURL} size={"sm"} />
                      </Box>
                      <VStack align={"flex-start"} gap={"0.2rem"}>
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
            </Flex>
          </ModalBody>
          <ModalFooter p="0" justifyContent={"flex-start"}>
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
                border={"none"}
                flex="1"
                mr="2"
                _focus={{ outline: "none", boxShadow: "none", border: "none" }}
              />
              <Button fontSize={"1rem"} variant={"link-button"} size="sm">
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
