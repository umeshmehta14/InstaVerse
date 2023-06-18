import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useAuth, useUser } from "../../../contexts";
import { userSuggestionAllProfileBox } from "../../../styles/UserSuggestionStyles";
import { useNavigate } from "react-router-dom";
import { FollowedByUsers } from "../../FollowedByUsers/FollowedByUsers";

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
    <Box borderWidth="1px" borderRadius="lg">
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
        {suggestedUser?.map(
          ({ _id, username, firstName, avatarURL, followers }) => (
            <Flex key={_id} sx={userSuggestionAllProfileBox}>
              <Flex
                flexDir={{ base: "column", lg: "row" }}
                align={"center"}
                gap={"0.5rem"}
                title={username}
                onClick={() => navigate(`/profile/${username}`)}
              >
                <Avatar
                  size={{ base: "md", md: "sm" }}
                  name={firstName}
                  src={
                    avatarURL ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAeY_IFrsiUIvvfnSvAcmrdoNUprysMGfCQ&usqp=CAU"
                  }
                />
                <Box>
                  <Text fontSize="sm">{username}</Text>
                  <FollowedByUsers followers={followers} />
                </Box>
              </Flex>
              <Button
                variant={"link-button"}
                size="sm"
                colorScheme="blue"
                onClick={() => handleFollow(username)}
              >
                Follow
              </Button>
            </Flex>
          )
        )}
      </Flex>
    </Box>
  );
};

export default UserSuggestionMain;
