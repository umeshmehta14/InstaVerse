import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
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
} from "@chakra-ui/react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { commentInput, emojiPickerButton } from "../../../styles/GlobalStyles";
import { HeartPopup } from "../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addCommentMainBox,
  commentSectionMain,
  mediaPostBox,
  mobileCommentHeading,
  mobileFooterStyle,
  modalContentStyle,
  singlePostModalClose,
} from "../../../styles/SinglePostStyle";
import { AiOutlineArrowLeft, BsEmojiSunglasses } from "../../../utils/Icons";
import { DisplayComments } from "./DisplayComments";
import { CommentFooter } from "./CommentFooter";
import { handleLikes } from "../../Post Feed/postSlice";

export const SinglePostModal = ({ onClose, redirectLocation, post }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();

  const [commentValue, setCommentValue] = useState("");
  const [doubleTap, setDoubleTap] = useState(false);
  const lastTapRef = useRef(0);

  const { currentUser } = useSelector((state) => state.authentication);

  const { _id, owner, url, likes } = post;
  const { username } = owner;

  const userLike = likes?.find(
    ({ username }) => username === currentUser.username
  );

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_THRESHOLD = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_THRESHOLD) {
      setDoubleTap(true);
      if (!userLike) {
        dispatch(handleLikes({ _id, singlePost: true }));
      }
      setTimeout(() => {
        setDoubleTap(false);
      }, 800);
    } else {
      setDoubleTap(false);
    }

    lastTapRef.current = now;
  };

  return (
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
          onClick={() => navigate(redirectLocation || "/")}
        />
        <ModalBody p={0} height={"100%"}>
          <HStack align={"flex-start"} height={"600px"}>
            <Flex {...mediaPostBox} pos={"relative"}>
              <Image
                src={url}
                w={"100%"}
                height={"100%"}
                onClick={() => handleDoubleTap()}
              />
              {doubleTap && <HeartPopup />}
            </Flex>
            <Flex {...commentSectionMain}>
              <HStack {...mobileCommentHeading}>
                <Box
                  as={AiOutlineArrowLeft}
                  fontSize={"1.8rem"}
                  onClick={() =>
                    navigate(
                      location?.pathname === redirectLocation
                        ? `/profile/${username}`
                        : redirectLocation || `/profile/${username}`
                    )
                  }
                />
                <Text>Comments</Text>
              </HStack>

              {username && (
                <DisplayComments post={post} location={redirectLocation} />
              )}

              {username && <CommentFooter post={post} userLike={userLike} />}
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
              onClick={() => (commentValue !== "" ? handleCommentPost() : "")}
              color={commentValue === "" ? "gray" : undefined}
              p="0"
            >
              Post
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
