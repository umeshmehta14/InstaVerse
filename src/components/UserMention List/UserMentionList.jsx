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
import { handleUserClick } from "../../utils/Utils";

export const UserMentionList = ({
  matchIndex,
  commentValue,
  setCommentValue,
  setShowTagBox,
  setMatchIndex,
  bottom,
}) => {
  const { searchedUsers, isLoading } = useSelector((state) => state.user);
  const { colorMode } = useColorMode();
  return (
    <Box
      pos={"absolute"}
      backgroundColor={colorMode === "dark" ? "black.900" : "white.900"}
      maxH={"300px"}
      overflow={"scroll"}
      w={"70%"}
      p={"0.5rem"}
      sx={hideScrollbar}
      zIndex={9999}
      bottom={!bottom && "3.5rem"}
      top={bottom && "3.5rem"}
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
              <React.Fragment key={_id}>
                <Flex
                  gap={"2"}
                  my={"2"}
                  cursor={"pointer"}
                  w={"100%"}
                  _hover={{ bg: "#1f1f1f6a" }}
                  title={username}
                  onClick={() =>
                    handleUserClick(
                      username,
                      matchIndex,
                      commentValue,
                      setCommentValue,
                      setShowTagBox,
                      setMatchIndex
                    )
                  }
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
              </React.Fragment>
            );
          })}
    </Box>
  );
};
