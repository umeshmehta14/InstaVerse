import {
  Avatar,
  Button,
  Flex,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleFollowUnfollowUser } from "../../../pages/Post Feed/userSlice";
import { userNameStyle } from "../../../styles/GlobalStyles";
import {
  getRelativeTime,
  renderCaptionWithMentionsAndHashtags,
} from "../../../utils/Utils";
import { RotatingLoader } from "../../Loader/RotatingLoader";

export const NotificationItem = ({
  type,
  actionBy,
  createdAt,
  post,
  comment,
  replyText,
  setUnfollowUser,
  onClose,
  unfollowModalDisclosure,
}) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.authentication);
  const { loadingUsers } = useSelector((state) => state.user);

  const { _id, username, avatar } = actionBy;
  const isFollowing = currentUser?.following?.some((user) => user?._id === _id);
  const isLoading = loadingUsers.includes(_id);

  const handleProfileNavigation = (e) => {
    e.stopPropagation();
    navigate(`/profile/${username}`);
    onClose();
  };

  const handleFollowToggle = (e, follow) => {
    e.stopPropagation();
    if (follow) {
      dispatch(
        handleFollowUnfollowUser({
          _id,
          follow: true,
          username,
          noPostLoading: true,
        })
      );
    } else {
      setUnfollowUser({ _id, username, avatar });
      unfollowModalDisclosure.onOpen();
    }
  };

  const commonProps = {
    cursor: "pointer",
    w: "100%",
    title: username,
    onClick: () => {
      navigate(`/post/${post?._id}`);
      onClose();
    },
    _hover: colorMode === "dark" ? { bg: "#323232ad" } : "",
  };

  if (type === "follow") {
    return (
      <Flex key={_id} gap="2" my="2" {...commonProps}>
        <Flex alignItems="center" gap="2">
          <Avatar size="md" src={avatar?.url} />
        </Flex>
        <Flex gap={{ base: "0.5rem", md: "3rem" }} alignItems="center">
          <Flex flexWrap="wrap">
            <Text wordBreak="break-word">
              <Text
                as="span"
                onClick={handleProfileNavigation}
                {...userNameStyle}
              >
                {username}
              </Text>
              <Text as="span" ml="0.2rem">
                started following you.
              </Text>
              <Text
                fontSize="14px"
                color="#717171e0"
                display="inline"
                ml="0.2rem"
                wordBreak="break-word"
              >
                {getRelativeTime(createdAt)}
              </Text>
            </Text>
          </Flex>
          <Button
            variant={isFollowing ? "following-button" : "follow-button"}
            title={isFollowing ? "Unfollow" : "Follow"}
            onClick={(e) => handleFollowToggle(e, !isFollowing)}
          >
            {isLoading ? (
              <RotatingLoader w="20" sw="7" />
            ) : isFollowing ? (
              "Following"
            ) : (
              "Follow"
            )}
          </Button>
        </Flex>
      </Flex>
    );
  } else if (type === "like") {
    return (
      <Flex key={_id} gap="2" my="2" {...commonProps}>
        <Flex alignItems="center" gap="2">
          <Avatar size="md" src={avatar?.url} />
        </Flex>
        <Flex
          gap={{ base: "0.5rem", md: "1rem" }}
          alignItems="center"
          justifyContent="space-between"
          w="100%"
        >
          <Flex flexWrap="wrap">
            <Text wordBreak="break-word">
              <Text
                as="span"
                onClick={handleProfileNavigation}
                {...userNameStyle}
              >
                {username}
              </Text>
              <Text as="span" ml="0.2rem">
                liked your photo.
              </Text>
              <Text
                fontSize="14px"
                color="#717171e0"
                display="inline"
                ml="0.2rem"
                wordBreak="break-word"
              >
                {getRelativeTime(createdAt)}
              </Text>
            </Text>
          </Flex>
          <Image src={post?.url} w="50px" h="50px" borderRadius="14px" />
        </Flex>
      </Flex>
    );
  } else if (
    type === "comment" ||
    type === "commentLike" ||
    type === "mention" ||
    type === "postMention"
  ) {
    const textContent =
      type === "commentLike"
        ? replyText || comment.text
        : comment?.text || post?.caption;
    const label =
      type === "comment"
        ? "commented:"
        : type === "commentLike"
        ? "liked your comment:"
        : type === "mention"
        ? ": Mentioned you in a comment."
        : "mentioned you in a post:";

    return (
      <Flex key={_id} gap="2" my="2" {...commonProps}>
        <Flex alignItems="center" gap="2">
          <Avatar size="md" src={avatar?.url} />
        </Flex>
        <Flex
          gap={{ base: "0.5rem", md: "1rem" }}
          alignItems="center"
          justifyContent="space-between"
          w="100%"
        >
          <Flex flexWrap="wrap">
            <Text wordBreak="break-word">
              <Text
                as="span"
                onClick={handleProfileNavigation}
                {...userNameStyle}
              >
                {username}
              </Text>
              <Text as="span" ml="0.2rem">
                {label}
              </Text>
              <Text display="inline" ml="0.2rem" wordBreak="break-word">
                {renderCaptionWithMentionsAndHashtags(textContent, navigate)}
              </Text>
              <Text
                fontSize="14px"
                color="#717171e0"
                display="inline"
                ml="0.2rem"
                wordBreak="break-word"
              >
                {getRelativeTime(createdAt)}
              </Text>
            </Text>
          </Flex>
          <Image
            src={post?.url}
            minW="50px"
            maxW="50px"
            h="50px"
            borderRadius="14px"
          />
        </Flex>
      </Flex>
    );
  }
};
