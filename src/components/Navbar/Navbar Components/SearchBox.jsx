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
import React, { useCallback } from "react";

import { RxCrossCircled, BsDot } from "../../../utils/Icons";
import { useNavigate } from "react-router-dom";
import { getMutualFollowers } from "../../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchedUsers,
  updateSearchValue,
} from "../../../pages/Post Feed/userSlice";
import SearchSkeleton from "./SearchSkeleton";

const SearchBox = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.authentication);
  const { searchedUsers, searchValue, isLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const debounce = (func, delay) => {
    let timeoutId;
    return (args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(func(args));
      }, delay);
    };
  };

  const debouncedFetchData = useCallback(debounce(getSearchedUsers, 500), [
    getSearchedUsers,
  ]);

  return (
    <Box>
      <Drawer
        isOpen={isOpen}
        onClose={() => {
          dispatch(updateSearchValue(""));
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
                  debouncedFetchData(e.target.value);
                }}
                value={searchValue}
              />
              {searchValue && (
                <InputRightElement>
                  <Box
                    as={RxCrossCircled}
                    cursor={"pointer"}
                    onClick={() => dispatch(updateSearchValue(""))}
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
                })
              ))}
            <Flex align={"center"} w={"100%"} justify={"center"} py={"3rem"}>
              {searchValue && searchedUsers?.length === 0 && "No Results Found"}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SearchBox;
