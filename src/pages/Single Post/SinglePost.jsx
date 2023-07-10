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
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorMode,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { usePost, useUser } from "../../contexts";
import { AiOutlineArrowLeft, BsEmojiSunglasses } from "../../utils/Icons";
import { DisplayComments, CommentFooter, MobileSinglePost } from "../index";
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
import { SET_DEFAULT_TAB, fallBackImg } from "../../utils/Constants";

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
    handleSinglePost,
    handleCreateComment,
    postState: { singlePost },
  } = usePost();
  const {
    userState: { users },
    userDispatch,
  } = useUser();

  const { _id, comments, username, mediaUrl } = singlePost;
  document.title = `@${username}`;

  const profileUser = users.find((user) => user.username === username);

  const handleCommentPost = () => {
    handleCreateComment(commentValue, _id);
    setCommentValue("");
  };

  useEffect(() => {
    handleSinglePost(postId);
    userDispatch({ type: SET_DEFAULT_TAB, payload: 0 });
  }, [postId, comments, handleSinglePost, singlePost]);

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
                    fallbackSrc={fallBackImg}
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
                <Popover>
                  <PopoverTrigger>
                    <Box
                      as={BsEmojiSunglasses}
                      {...emojiPickerButton}
                      title="Emoji"
                    />
                  </PopoverTrigger>
                  <PopoverContent bottom={"27rem"} bg={"transparent"}>
                    <PopoverBody p={0}>
                      <Picker
                        data={data}
                        onEmojiSelect={(emoji) =>
                          setCommentValue(commentValue + emoji.native)
                        }
                        theme={colorMode}
                        title="Pick an Emoji"
                        emoji=""
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
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
