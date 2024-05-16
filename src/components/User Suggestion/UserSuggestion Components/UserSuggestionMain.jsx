import React from "react";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import {
  allSuggestedProfileBox,
  userSuggestionAllProfileBox,
} from "../../../styles/UserSuggestionStyles";
import { getMutualFollowers } from "../../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { handleFollowUnfollowUser } from "../../../pages/Post Feed/userSlice";

const UserSuggestionMain = () => {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.authentication);
  const { suggestedUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const suggestedUser = users?.filter(
  //   (user) =>
  //     user._id !== currentUser?._id &&
  //     !currentUser?.following?.some(
  //       ({ username }) => username === user.username
  //     )
  // );

  return (
    suggestedUsers?.length > 0 && (
      <>
        <Box overflow="hidden">
          <Flex p="3" align="center">
            <Text fontWeight="semibold" mx={"auto"}>
              Suggested For You
            </Text>
          </Flex>

          <Flex {...allSuggestedProfileBox}>
            {suggestedUsers?.map(({ _id, username, avatar, follower }) => {
              const isFollowing = currentUser.follower.find(
                (user) => user.username === username
              );
              return (
                <Flex
                  key={_id}
                  sx={userSuggestionAllProfileBox}
                  alignItems={"center"}
                >
                  <Flex
                    flexDir={{ base: "column", lg: "row" }}
                    align={"center"}
                    gap={"0.5rem"}
                    title={username}
                    onClick={() => navigate(`/profile/${username}`)}
                  >
                    <Avatar size={"md"} src={avatar.url} />
                    <Flex flexDir={"column"}>
                      <Text fontSize="sm">{username}</Text>
                      <Flex
                        fontSize={"12px"}
                        color={"gray"}
                        display={{ base: "none", lg: "flex" }}
                      >
                        {isFollowing ? "Follows you" : "Suggested for you"}
                      </Flex>
                    </Flex>
                  </Flex>
                  <Button
                    variant={"link-button"}
                    size="sm"
                    p={0}
                    onClick={() =>
                      dispatch(
                        handleFollowUnfollowUser({
                          _id,
                          follow: true,
                          username,
                        })
                      )
                    }
                  >
                    Follow
                  </Button>
                </Flex>
              );
            })}
          </Flex>
        </Box>
      </>
    )
  );
};

export default UserSuggestionMain;
