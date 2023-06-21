import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
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
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { usePost } from "../../contexts";
import DisplayComments from "./SinglePost Components/DisplayComments";
import { AiOutlineArrowLeft, BsEmojiSunglasses } from "../../utils/Icons";
import CommentFooter from "./SinglePost Components/CommentFooter";

export const SinglePost = () => {
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  const [commentValue, setCommentValue] = useState("");

  const {
    HandleSinglePost,
    HandleCreateComment,
    postState: { singlePost },
  } = usePost();

  console.log(singlePost);
  const { _id, username, comments, mediaUrl, createdAt, content, avatarURL } =
    singlePost;

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
            color={colorMode === "dark" ? "white" : "black"}
            _hover={{ bg: "red" }}
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

                <DisplayComments
                  post={singlePost}
                  location={location?.state?.from?.pathname}
                />
                <Divider />
                {singlePost?.username && <CommentFooter post={singlePost} />}
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
    </>
  );
};
