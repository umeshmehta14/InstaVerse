import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../contexts";
import { UserListModal } from "../UserListModal/UserListModal";

export const FollowedByUsers = ({ followers }) => {
  const { currentUser } = useAuth();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const mutualFollowers = followers?.filter(({ username }) =>
    currentUser?.following?.some((user) => user?.username === username)
  );

  return (
    <Flex
      fontSize={"sm"}
      color={"gray"}
      px={"1rem"}
      pb={"0.5rem"}
      onClick={onOpen}
    >
      {mutualFollowers?.length === 1 && (
        <Text>Followed by {mutualFollowers[0]?.username}</Text>
      )}
      {mutualFollowers?.length === 2 && (
        <Text>
          Followed by {mutualFollowers[0]?.username},{" "}
          {mutualFollowers[1]?.username}
        </Text>
      )}
      {mutualFollowers?.length > 2 && (
        <Text>
          Followed by {mutualFollowers[0]?.username},{" "}
          {mutualFollowers[1]?.username} and +{mutualFollowers?.length - 2} more
        </Text>
      )}
      <UserListModal
        onClose={onClose}
        isOpen={isOpen}
        users={followers}
        heading={"Followers"}
      />
    </Flex>
  );
};
