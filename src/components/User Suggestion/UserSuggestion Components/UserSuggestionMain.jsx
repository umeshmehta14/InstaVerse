import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useAuth, useUser } from "../../../contexts";
import { userSuggestionAllProfileBox } from "../../../styles/UserSuggestionStyles";
import { useNavigate } from "react-router-dom";
import { getMutualFollowers } from "../../../utils/MutualFollowers";

const UserSuggestionMain = () => {
  const navigate = useNavigate();

  const {
    handleFollow,
    userState: { users },
  } = useUser();
  const { currentUser } = useAuth();

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
        <Box>
          <Flex p="3" align="center">
            <Text fontWeight="semibold" mx={"auto"}>
              Suggested For You
            </Text>
          </Flex>

          <Flex
            flexDir={{ base: "row", lg: "column" }}
            w={{ base: "100vw", md: "auto" }}
            overflow={"auto"}
            maxW={"100%"}
          >
            {suggestedUser?.map(({ _id, username, avatarURL, followers }) => {
              const mutualFollowers = getMutualFollowers(
                followers,
                currentUser
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
                      {mutualFollowers.length > 0 && (
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
                      )}
                    </Flex>
                  </Flex>
                  <Button
                    variant={"link-button"}
                    size="sm"
                    colorScheme="blue"
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
