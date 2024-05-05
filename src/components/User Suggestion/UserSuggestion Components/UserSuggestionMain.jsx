import React from "react";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../../contexts";
import {
  allSuggestedProfileBox,
  userSuggestionAllProfileBox,
} from "../../../styles/UserSuggestionStyles";
import { getMutualFollowers } from "../../../utils/Utils";
import { useSelector } from "react-redux";

const UserSuggestionMain = () => {
  const navigate = useNavigate();

  const {
    handleFollow,
    userState: { users },
  } = useUser();
  const { currentUser } = useSelector((state) => state.authentication);

  const suggestedUser = users?.filter(
    (user) =>
      user._id !== currentUser?._id &&
      !currentUser?.following?.some(
        ({ username }) => username === user.username
      )
  );

  return (
    suggestedUser?.length > 0 && (
      <>
        <Box maxH="360px" overflow="hidden">
          <Flex p="3" align="center">
            <Text fontWeight="semibold" mx={"auto"}>
              Suggested For You
            </Text>
          </Flex>

          <Flex {...allSuggestedProfileBox}>
            {suggestedUser?.map(({ _id, username, avatarURL, followers }) => {
              const mutualFollowers = getMutualFollowers(
                followers,
                currentUser
              );

              const isFollowing = currentUser.followers.find(
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
                    <Avatar size={{ base: "md", md: "sm" }} src={avatarURL} />
                    <Flex flexDir={"column"}>
                      <Text fontSize="sm">{username}</Text>
                      {mutualFollowers.length > 0 ? (
                        <Flex
                          fontSize={"12px"}
                          color={"gray"}
                          display={{ base: "none", lg: "flex" }}
                        >
                          Followed by {mutualFollowers[0].username}
                          {mutualFollowers?.length > 1 && (
                            <> and +{mutualFollowers?.length - 1} more</>
                          )}
                        </Flex>
                      ) : (
                        isFollowing && (
                          <Flex
                            fontSize={"12px"}
                            color={"gray"}
                            display={{ base: "none", lg: "flex" }}
                          >
                            Follows you
                          </Flex>
                        )
                      )}
                    </Flex>
                  </Flex>
                  <Button
                    variant={"link-button"}
                    size="sm"
                    p={0}
                    onClick={() => handleFollow(username)}
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
