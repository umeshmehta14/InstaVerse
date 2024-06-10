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

import {
  getRelativeTime,
  renderCaptionWithHashtags,
} from "../../../utils/Utils";
import { InfoPopup, RotatingLoader } from "../../../components/index";
import {
  commentTextStyle,
  displayCommentMainBox,
} from "../../../styles/SinglePostStyle";
import { postNavStyles, postThreeDot } from "../../../styles/PostBoxStyles";
import {
  AiFillHeart,
  AiOutlineHeart,
  BsDot,
  BsThreeDots,
} from "../../../utils/Icons";
import {
  hideScrollbar,
  simpleButton,
  userNameStyle,
} from "../../../styles/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { handleFollowUnfollowUser } from "../../Post Feed/userSlice";

export const DisplayComments = ({ post, location }) => {
  const {
    _id: postId,
    owner,
    comments,
    caption,
    edit,
    createdAt,
    updatedAt,
  } = post;

  const { username, avatar, _id } = owner;

  const navigate = useNavigate();

  const infoPopupDisclosure = useDisclosure();
  const commentDeleteDisclosure = useDisclosure();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.authentication);
  const { loadingUsers } = useSelector((state) => state.user);

  const postFollow = currentUser?.following?.find(
    (user) => user?.username === username
  );

  const isLoading = loadingUsers?.includes(_id);

  return (
    <>
      <Flex {...postNavStyles} display={{ base: "none", md: "flex" }}>
        <Flex alignItems={"center"}>
          <Flex
            alignItems={"center"}
            cursor={"pointer"}
            title={username}
            onClick={() => navigate(`/profile/${username}`)}
          >
            <Avatar size="sm" src={avatar?.url} />
            <Text ml="2" {...userNameStyle}>
              {username}
            </Text>
            {!postFollow && !(currentUser?.username === username) && (
              <>
                <Box as={BsDot} fontSize={"1.5rem"} />
                <Button
                  variant={"link-button"}
                  size="sm"
                  p={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      handleFollowUnfollowUser({
                        _id,
                        follow: true,
                        noPostLoading: true,
                        notSelectedUser: true,
                        singlePost: postId,
                      })
                    );
                  }}
                >
                  {isLoading ? <RotatingLoader w="20" sw={"7"} /> : "Follow"}
                </Button>
              </>
            )}
          </Flex>
        </Flex>
        <Button {...postThreeDot} onClick={infoPopupDisclosure.onOpen}>
          <Box as={BsThreeDots} cursor={"pointer"} />
        </Button>
      </Flex>
      <Flex {...postNavStyles} w={"100%"}>
        <Flex gap={4} cursor={"pointer"} title={username}>
          <Avatar
            size="md"
            src={avatar?.url}
            onClick={() => navigate(`/profile/${username}`)}
            cursor={"pointer"}
          />
          <VStack alignItems={"flex-start"} gap={0}>
            <Box>
              <Text
                as="span"
                {...userNameStyle}
                onClick={() => navigate(`/profile/${username}`)}
                mr={"0.3rem"}
              >
                {username}
              </Text>
              <Text
                as="span"
                whiteSpace={"break-spaces"}
                fontWeight={100}
                fontSize={"0.95rem"}
              >
                {renderCaptionWithHashtags(caption)}
              </Text>
            </Box>
            <Flex fontSize="sm" color={"#717171e0"} alignItems={"center"}>
              {edit && (
                <>
                  <Text>Edited</Text>
                  <Box display={"inline"} as={BsDot} />
                </>
              )}
              <Text>{getRelativeTime(edit ? updatedAt : createdAt)}</Text>
            </Flex>
          </VStack>
        </Flex>
      </Flex>
      <VStack
        bg={colorMode === "dark" ? "black.900" : "white.500"}
        {...displayCommentMainBox}
        sx={hideScrollbar}
      >
        {comments?.length === 0 ? (
          <Text h="100px" textAlign="center" w="100%" pt="4rem" color="gray">
            No Comments Yet
          </Text>
        ) : (
          comments?.map((comment) => {
            const {
              _id,
              owner: { username, avatar: commentAvatar },
              text,
              createdAt,
              likes,
            } = comment || {};

            const commentLike = likes?.find(
              (like) => like === currentUser?._id
            );
            return (
              <Flex key={_id} gap={"1rem"} title={username} w={"100%"}>
                <Box pt={"2"} onClick={() => navigate(`/profile/${username}`)}>
                  <Avatar
                    src={commentAvatar?.url}
                    size={"sm"}
                    cursor={"pointer"}
                  />
                </Box>
                <VStack align={"flex-start"} gap={"0"} w={"100%"}>
                  <Box>
                    <Text
                      {...userNameStyle}
                      onClick={() => navigate(`/profile/${username}`)}
                      as={"span"}
                      mr={"0.3rem"}
                    >
                      {username}
                    </Text>
                    <Text fontWeight={100} {...commentTextStyle} as={"span"}>
                      {text}
                    </Text>
                  </Box>

                  <Flex gap={"0.8rem"} alignItems={"center"}>
                    <Text fontSize="sm" color={"#717171e0"}>
                      {getRelativeTime(createdAt)}
                    </Text>
                    <Text fontSize="sm" color={"#717171e0"}>
                      {likes?.length} likes
                    </Text>
                    {currentUser.username === username && (
                      <Box
                        as={BsThreeDots}
                        onClick={(e) => {
                          // e.stopPropagation();
                          commentDeleteDisclosure.onOpen();
                        }}
                      />
                    )}
                  </Flex>
                </VStack>

                <Box
                  as={commentLike ? AiFillHeart : AiOutlineHeart}
                  fontSize={"12px"}
                  w={"10%"}
                  mt={"2"}
                  justifySelf={"flex-end"}
                />
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
      {commentDeleteDisclosure.isOpen && (
        <Modal
          onClose={commentDeleteDisclosure.onClose}
          size={"xs"}
          isOpen={commentDeleteDisclosure.isOpen}
        >
          <ModalOverlay />
          <ModalContent
            mt={"20rem"}
            bg={colorMode === "dark" ? "black.700" : "white.500"}
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
    </>
  );
};
