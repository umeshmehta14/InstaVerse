import {
  Avatar,
  Box,
  Divider,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { hideScrollbar } from "../../styles/GlobalStyles";
import { useSelector } from "react-redux";

export const UserMentionList = ({ handleUserClick }) => {
  const { searchedUsers, isLoading } = useSelector((state) => state.user);
  const { colorMode } = useColorMode();
  return (
    <Box
      pos={"absolute"}
      backgroundColor={colorMode === "dark" ? "black.900" : "white.900"}
      bottom={"3.5rem"}
      maxH={"300px"}
      overflow={"scroll"}
      w={"70%"}
      p={"0.5rem"}
      sx={hideScrollbar}
    >
      {isLoading
        ? new Array(5).fill(null)?.map((_, index) => (
            <Flex gap={"2"} my={"2"} w={"100%"} key={index}>
              <SkeletonCircle size="12" />
              <SkeletonText
                mt="4"
                noOfLines={2}
                spacing="4"
                skeletonHeight="2"
                w={"80%"}
              />
            </Flex>
          ))
        : searchedUsers?.map((user) => {
            const { _id, avatar, username, fullName } = user;
            return (
              <>
                <Flex
                  key={_id}
                  gap={"2"}
                  my={"2"}
                  cursor={"pointer"}
                  w={"100%"}
                  _hover={{ bg: "#1f1f1f6a" }}
                  title={username}
                  onClick={() => handleUserClick(username)}
                >
                  <Flex alignItems={"center"} gap={"2"}>
                    <Avatar size="md" src={avatar?.url} />
                  </Flex>
                  <VStack align={"flex-start"} gap={"0"} whiteSpace={"nowrap"}>
                    <Text>{username}</Text>
                    <Flex fontSize={"0.8rem"} color={"gray"}>
                      <Text>{fullName}</Text>
                    </Flex>
                  </VStack>
                </Flex>
                <Divider />
              </>
            );
          })}
    </Box>
  );
};
