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
import { useDispatch, useSelector } from "react-redux";
import { handleGetPostById } from "../Post Feed/postSlice";
import { updateTab } from "../Post Feed/userSlice";

export const SinglePost = () => {
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectLocation = location?.state?.from?.pathname;

  const { onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  const {
    singlePost: { post, postLoading },
  } = useSelector((state) => state.post);

  console.log({ post });

  const [commentValue, setCommentValue] = useState("");

  const { handleCreateComment } = usePost();
  const {
    userState: { users },
  } = useUser();

  const { _id, comments, owner, url } = post || {};
  const { username } = owner || {};

  document.title = `@${username}` || "Instaverse";

  const profileUser = users.find((user) => user.username === username);

  const handleCommentPost = () => {
    handleCreateComment(commentValue, _id);
    setCommentValue("");
  };

  useEffect(() => {
    if (postId) {
      dispatch(handleGetPostById({ _id: postId }));
      dispatch(updateTab(0));
    }
  }, [postId, dispatch]);

  return (
    <>
      {isMobile && redirectLocation?.includes("/profile") ? (
        username && <MobileSinglePost post={post} />
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
                  <Image src={url} w={"100%"} height={"100%"} />
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

                  <DisplayComments post={post} location={redirectLocation} />

                  {username && <CommentFooter post={post} />}
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
                  px={"2"}
                />
                <Button
                  fontSize={"0.8rem"}
                  variant={"link-button"}
                  size="sm"
                  onClick={() =>
                    commentValue !== "" ? handleCommentPost() : ""
                  }
                  color={commentValue === "" ? "gray" : undefined}
                  p="0"
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
