import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import {
  getRelativeTime,
  renderCaptionWithMentionsAndHashtags,
} from "../../../utils/Utils";
import { InfoPopup, RotatingLoader } from "../../../components/index";
import { postNavStyles, postThreeDot } from "../../../styles/PostBoxStyles";
import { BsDot, BsThreeDots } from "../../../utils/Icons";
import { userNameStyle } from "../../../styles/GlobalStyles";
import { handleFollowUnfollowUser } from "../../Post Feed/userSlice";
import { CommentList } from "./CommentList";

export const PostCommentSection = ({ post, location }) => {
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
  const infoPopupDisclosure = useDisclosure();

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.authentication);
  const { loadingUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
                  {renderCaptionWithMentionsAndHashtags(caption, navigate)}
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
      <CommentList comments={comments} ownerId={ownerId} />
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
