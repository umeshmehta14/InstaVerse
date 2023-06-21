import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
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
  useColorMode,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

import { usePost, useUser } from "../../contexts";
import DisplayComments from "./SinglePost Components/DisplayComments";
import { AiOutlineArrowLeft, BsEmojiSunglasses } from "../../utils/Icons";
import CommentFooter from "./SinglePost Components/CommentFooter";
import MobileSinglePost from "./SinglePost Components/MobileSinglePost";
import {
  addCommentMainBox,
  commentSectionMain,
  mediaPostBox,
  mobileCommentHeading,
  mobileFooterStyle,
  modalContentStyle,
  singlePostModalClose,
} from "../../styles/SinglePostStyle";
import { commentInput, emojiPickerButton } from "../../styles/GlobalStyles";

export const SinglePost = () => {
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const redirectLocation = location?.state?.from?.pathname;

  const { onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  const [commentValue, setCommentValue] = useState("");

  const {
    HandleSinglePost,
    HandleCreateComment,
    postState: { singlePost },
  } = usePost();
  const {
    userState: { users },
  } = useUser();

  const { _id, comments, username, mediaUrl } = singlePost;

  const profileUser = users.find((user) => user.username === username);

  console.log(profileUser);

  const handleCommentPost = () => {
    HandleCreateComment(commentValue, _id);
    setCommentValue("");
  };

  useEffect(() => {
    HandleSinglePost(postId);
  }, [postId, comments]);

  console.log(location?.pathname);
  console.log(redirectLocation);

  console.log(location?.pathname === redirectLocation);

  return (
    <>
      {isMobile && redirectLocation?.includes("/profile") ? (
        username && <MobileSinglePost post={singlePost} />
      ) : (
        <Modal
          onClose={onClose}
          size={{ base: "full", md: "lg", lg: "xl" }}
          isOpen={true}
          maxW="auto"
        >
          <ModalOverlay />
          <ModalContent
            bg={colorMode === "dark" ? "black.900" : "white.500"}
            {...modalContentStyle}
          >
            <ModalCloseButton
              color={colorMode === "dark" ? "white" : "black"}
              {...singlePostModalClose}
              onClick={() => navigate(redirectLocation)}
            />
            <ModalBody p={0} height={"100%"}>
              <HStack align={"flex-start"} height={"600px"}>
                <Flex {...mediaPostBox}>
                  <Image
                    src={mediaUrl}
                    fallbackSrc="https://tse4.mm.bing.net/th?id=OIP.y0vjVCLBEYW5ANsy2YHhGgHaCe&pid=Api&P=0&h=180"
                    w={"100%"}
                    height={"100%"}
                  />
                </Flex>
                <Flex {...commentSectionMain}>
                  <HStack {...mobileCommentHeading}>
                    <Box
                      as={AiOutlineArrowLeft}
                      fontSize={"1.8rem"}
                      onClick={() =>
                        navigate(
                          location?.pathname === redirectLocation
                            ? `/profile/${profileUser?.username}`
                            : redirectLocation
                        )
                      }
                    />
                    <Text>Comments</Text>
                  </HStack>

                  <DisplayComments
                    post={singlePost}
                    location={redirectLocation}
                  />

                  {username && <CommentFooter post={singlePost} />}
                </Flex>
              </HStack>
            </ModalBody>
            <ModalFooter
              bg={colorMode === "dark" ? "black.900" : "white.500"}
              {...mobileFooterStyle}
            >
              <Flex {...addCommentMainBox}>
                <Box
                  as={BsEmojiSunglasses}
                  title="Emoji"
                  {...emojiPickerButton}
                />
                <Input
                  placeholder="Add a comment..."
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  {...commentInput}
                />
                <Button
                  fontSize={"1rem"}
                  variant={"link-button"}
                  size="sm"
                  onClick={() =>
                    commentValue !== "" ? handleCommentPost() : ""
                  }
                  color={commentValue === "" ? "gray" : undefined}
                >
                  Post
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
