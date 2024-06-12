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
import {
  IconHoverStyle,
  postNavStyles,
  postThreeDot,
} from "../../../styles/PostBoxStyles";
import {
  AiFillHeart,
  AiOutlineHeart,
  BsDot,
  BsThreeDots,
} from "../../../utils/Icons";
import {
  hideScrollbar,
  likeHeartStyle,
  simpleButton,
  userNameStyle,
} from "../../../styles/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { handleFollowUnfollowUser } from "../../Post Feed/userSlice";
import {
  deleteCommentToPost,
  handleCommentLike,
  updateCommentEdit,
} from "../commentSlice";
import { useState } from "react";

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

  const { username, avatar, _id: ownerId } = owner;

  const navigate = useNavigate();
  const [commentId, setCommentId] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const infoPopupDisclosure = useDisclosure();
  const commentDeleteDisclosure = useDisclosure();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.authentication);
  const { loadingUsers } = useSelector((state) => state.user);
  const { commentEdit } = useSelector((state) => state.comment);

  const postFollow = currentUser?.following?.find(
    (user) => user?.username === username
  );

  const isLoading = loadingUsers?.includes(ownerId);

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
                        _id: ownerId,
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
      {caption?.length !== 0 && (
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
      )}

      <VStack
        bg={colorMode === "dark" ? "black.900" : "white.500"}
        {...displayCommentMainBox}
        sx={hideScrollbar}
      >
        {comments?.length === 0 ? (
          <Text h="100%" textAlign="center" w="100%" pt="4rem" color="gray">
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
                    {likes?.length !== 0 && (
                      <Text fontSize="sm" color={"#717171e0"}>
                        {likes?.length}
                        {likes?.length > 1 ? " likes" : " like"}
                      </Text>
                    )}
                    {(currentUser._id === ownerId ||
                      currentUser?.username === username) &&
                      commentEdit !== _id && (
                        <Box
                          as={BsThreeDots}
                          onClick={() => {
                            setCommentId(_id);
                            commentDeleteDisclosure.onOpen();
                          }}
                        />
                      )}
                  </Flex>
                </VStack>

                {commentDeleteDisclosure.isOpen && (
                  <Modal
                    onClose={commentDeleteDisclosure.onClose}
                    size={"xs"}
                    isOpen={commentDeleteDisclosure.isOpen}
                  >
                    <ModalOverlay bg="rgba(0, 0, 0, 0.5)" />
                    <ModalContent
                      mt={"20rem"}
                      bg={colorMode === "dark" ? "black.700" : "white.500"}
                    >
                      <ModalBody>
                        {currentUser?.username === username && (
                          <>
                            <Button
                              sx={simpleButton}
                              onClick={() => {
                                dispatch(updateCommentEdit(commentId));
                                commentDeleteDisclosure.onClose();
                              }}
                            >
                              Edit
                            </Button>

                            <Divider />
                          </>
                        )}
                        <Button
                          sx={simpleButton}
                          color={"red.500"}
                          onClick={() => {
                            dispatch(deleteCommentToPost({ _id: commentId }));
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

                <Box
                  as={commentLike ? AiFillHeart : AiOutlineHeart}
                  fontSize={"12px"}
                  sx={
                    commentLike ? { ...likeHeartStyle } : { ...IconHoverStyle }
                  }
                  w={"10%"}
                  mt={"2"}
                  justifySelf={"flex-end"}
                  onClick={() => {
                    setIsLiked(!isLiked);
                    commentLike
                      ? dispatch(handleCommentLike({ _id, unlike: true }))
                      : dispatch(handleCommentLike({ _id }));
                  }}
                  className={isLiked ? "like-animation" : ""}
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
    </>
  );
};
