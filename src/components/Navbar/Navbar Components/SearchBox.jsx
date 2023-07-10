import {
  Box,
  Input,
  useColorMode,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  InputGroup,
  InputRightElement,
  Divider,
  Flex,
  Avatar,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

import { RxCrossCircled, BsDot } from "../../../utils/Icons";
import { useAuth, useUser } from "../../../contexts";
import { SET_SEARCH_VALUE } from "../../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { getMutualFollowers } from "../../../utils/Utils";

const SearchBox = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  const {
    userState: { searchValue, searchedUsers },
    userDispatch,
  } = useUser();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <Box>
      <Drawer
        isOpen={isOpen}
        onClose={() => {
          userDispatch({ type: SET_SEARCH_VALUE, payload: "" });
          onClose();
        }}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent
          bg={colorMode === "dark" ? "black.900" : "white.500"}
          borderRight={"0.5px solid gray"}
        >
          <DrawerCloseButton title="Close" />
          <DrawerHeader>Search</DrawerHeader>
          <DrawerBody p={"1rem 0.5rem"} overflow="hidden">
            <InputGroup mb={"1rem"}>
              <Input
                placeholder="Search User..."
                onChange={(e) =>
                  userDispatch({
                    type: SET_SEARCH_VALUE,
                    payload: e.target.value,
                    currentUser,
                  })
                }
                value={searchValue}
              />
              {searchValue && (
                <InputRightElement>
                  <Box
                    as={RxCrossCircled}
                    cursor={"pointer"}
                    onClick={() =>
                      userDispatch({ type: SET_SEARCH_VALUE, payload: "" })
                    }
                    title="Clear"
                  />
                </InputRightElement>
              )}
            </InputGroup>
            <Divider />

            {searchValue &&
              searchedUsers?.map((user) => {
                const {
                  _id,
                  avatarURL,
                  username,
                  firstName,
                  lastName,
                  followers,
                } = user;
                const mutualFollower = getMutualFollowers(
                  followers,
                  currentUser
                );
                return (
                  <Flex
                    key={_id}
                    gap={"2"}
                    my={"4"}
                    cursor={"pointer"}
                    _hover={{ bg: "#1f1f1f6a" }}
                    title={username}
                    onClick={() => {
                      navigate(`/profile/${username}`);
                      onClose();
                    }}
                  >
                    <Flex alignItems={"center"} gap={"2"}>
                      <Avatar size="md" name={firstName} src={avatarURL} />
                    </Flex>
                    <VStack
                      align={"flex-start"}
                      gap={"0"}
                      whiteSpace={"nowrap"}
                    >
                      <Text>{username}</Text>
                      <Flex fontSize={"0.8rem"} color={"gray"}>
                        <Text>
                          {firstName} {lastName}
                        </Text>
                        {mutualFollower.length > 0 && (
                          <Flex alignItems={"center"}>
                            <BsDot />
                            <Text
                              whiteSpace="nowrap"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              w="150px"
                            >
                              Followed By {mutualFollower[0].username}{" "}
                              {mutualFollower.length > 1 && (
                                <>+{mutualFollower.length - 1} more</>
                              )}
                            </Text>
                          </Flex>
                        )}
                      </Flex>
                    </VStack>
                  </Flex>
                );
              })}
            <Flex align={"center"} w={"100%"} justify={"center"} py={"3rem"}>
              {searchValue && searchedUsers.length === 0 && "No Results Found"}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SearchBox;
