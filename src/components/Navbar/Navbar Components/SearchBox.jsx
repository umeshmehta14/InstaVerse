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
  Button,
} from "@chakra-ui/react";
import React, { useCallback } from "react";

import { RxCrossCircled, BsDot, RxCross2 } from "../../../utils/Icons";
import { useNavigate } from "react-router-dom";
import { getMutualFollowers } from "../../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserToSearchList,
  getSearchedUsers,
  removeUserFromSearchList,
  updateSearchedUsers,
  updateSearchValue,
} from "../../../pages/Post Feed/userSlice";
import SearchSkeleton from "./SearchSkeleton";

const SearchBox = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.authentication);
  const { searchedUsers, searchValue, isLoading, searchList } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const debounce = (delay) => {
    let timeoutId;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(getSearchedUsers());
      }, delay);
    };
  };

  const debouncedFetchData = useCallback(debounce(500), [getSearchedUsers]);

  return (
    <Box>
      <Drawer
        isOpen={isOpen}
        onClose={() => {
          dispatch(updateSearchValue(""));
          dispatch(updateSearchedUsers());
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
                onChange={(e) => {
                  dispatch(updateSearchValue(e.target.value));
                  debouncedFetchData();
                }}
                value={searchValue}
              />
              {searchValue && (
                <InputRightElement>
                  <Box
                    as={RxCrossCircled}
                    cursor={"pointer"}
                    onClick={() => {
                      dispatch(updateSearchValue(""));
                      dispatch(updateSearchedUsers());
                    }}
                    title="Clear"
                  />
                </InputRightElement>
              )}
            </InputGroup>
            <Divider />

            {searchValue &&
              (isLoading ? (
                <SearchSkeleton />
              ) : (
                searchedUsers?.map((user) => {
                  const { _id, avatar, username, fullName, followers } = user;
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
                        dispatch(addUserToSearchList({ _id }));
                        onClose();
                      }}
                    >
                      <Flex alignItems={"center"} gap={"2"}>
                        <Avatar size="md" name={fullName} src={avatar?.url} />
                      </Flex>
                      <VStack
                        align={"flex-start"}
                        gap={"0"}
                        whiteSpace={"nowrap"}
                      >
                        <Text>{username}</Text>
                        <Flex fontSize={"0.8rem"} color={"gray"}>
                          <Text>{fullName}</Text>
                          {mutualFollower?.length > 0 && (
                            <Flex alignItems={"center"}>
                              <BsDot />
                              <Text
                                whiteSpace="nowrap"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                w="150px"
                              >
                                Followed By {mutualFollower[0]?.username}{" "}
                                {mutualFollower?.length > 1 && (
                                  <>+{mutualFollower?.length - 1} more</>
                                )}
                              </Text>
                            </Flex>
                          )}
                        </Flex>
                      </VStack>
                    </Flex>
                  );
                })
              ))}

            {searchValue && isLoading && searchedUsers?.length === 0 && (
              <Flex align={"center"} w={"100%"} justify={"center"} py={"3rem"}>
                No Results Found
              </Flex>
            )}
            <Box>
              {searchValue?.length === 0 &&
                searchedUsers?.length === 0 &&
                searchList?.length > 0 && (
                  <Box>
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      py={"1rem"}
                    >
                      <Text>Recent</Text>
                      <Button variant={"link-button"}>Clear All</Button>
                    </Flex>
                    {searchList?.map(({ _id, avatar, username, fullName }) => (
                      <Flex
                        key={_id}
                        my={"4"}
                        cursor={"pointer"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        _hover={{ bg: "#1f1f1f6a" }}
                        title={username}
                        onClick={() => {
                          navigate(`/profile/${username}`);
                          onClose();
                        }}
                      >
                        <Flex gap={"3"} alignItems={"center"}>
                          <Avatar size="md" name={fullName} src={avatar?.url} />
                          <VStack align={"flex-start"} gap={"0"}>
                            <Text>{username}</Text>
                            <Text fontSize={"0.8rem"} color={"gray"}>
                              {fullName}
                            </Text>
                          </VStack>
                        </Flex>
                        <Box
                          as={RxCross2}
                          fontSize={"1.5rem"}
                          color={"gray"}
                          title="remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(removeUserFromSearchList({ _id }));
                          }}
                          pos={"relative"}
                          zIndex={"3"}
                        />
                      </Flex>
                    ))}
                  </Box>
                )}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SearchBox;
