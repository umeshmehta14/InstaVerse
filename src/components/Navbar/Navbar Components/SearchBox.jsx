import { useCallback, useEffect, useRef } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { debounce, getMutualFollowers } from "../../../utils/Utils";
import {
  addUserToSearchList,
  getSearchedUsers,
  removeUserFromSearchList,
  updateSearchedUsers,
  updateSearchValue,
} from "../../../pages/Post Feed/userSlice";
import { SearchSkeleton } from "../../index";
import { RxCrossCircled, BsDot, RxCross2 } from "../../../utils/Icons";
import { ClearRecentModal } from "./ClearRecentModal";
import {
  mutualUserStyle,
  recentCrossStyle,
  searchBoxUsersStyle,
  searchRecentStyle,
} from "../../../styles/NavbarStyles";
import { userViewBoxStyle } from "../../../styles/GlobalStyles";

export const SearchBox = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  const clearRecentDisclosure = useDisclosure();

  const navigate = useNavigate();
  const searchRef = useRef(null);

  const { currentUser } = useSelector((state) => state.authentication);
  const {
    searchedUsers,
    searchValue,
    isLoading,
    searchList,
    isSearchUserFetched,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchValue?.length === 0) {
      dispatch(updateSearchedUsers());
    }
  }, [searchValue]);

  useEffect(() => {
    if (isOpen) {
      searchRef.current?.focus();
    }
  }, [isOpen]);

  const debouncedFetchData = useCallback(debounce(dispatch), [
    getSearchedUsers,
  ]);

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
                ref={searchRef}
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
                <VStack {...searchBoxUsersStyle}>
                  {searchedUsers?.map((user) => {
                    const { _id, avatar, username, fullName, follower } = user;
                    const mutualFollower = getMutualFollowers(
                      follower,
                      currentUser
                    );
                    return (
                      <Flex
                        key={_id}
                        {...userViewBoxStyle}
                        title={username}
                        onClick={() => {
                          navigate(`/profile/${username}`);
                          dispatch(addUserToSearchList({ _id }));
                          onClose();
                        }}
                      >
                        <Flex alignItems={"center"} gap={"2"}>
                          <Avatar size="md" src={avatar?.url} />
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
                                <Text {...mutualUserStyle}>
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
                  })}
                </VStack>
              ))}
            {searchValue?.length > 0 &&
              !isLoading &&
              searchedUsers?.length === 0 &&
              isSearchUserFetched && (
                <Flex align="center" justify="center" w="100%" py="3rem">
                  No Results Found
                </Flex>
              )}
            <Box>
              {searchValue?.length === 0 &&
              searchedUsers?.length === 0 &&
              searchList?.length > 0 ? (
                <Box>
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    py={"1rem"}
                  >
                    <Text>Recent</Text>
                    <Button
                      variant={"link-button"}
                      onClick={() => clearRecentDisclosure.onOpen()}
                    >
                      Clear All
                    </Button>
                  </Flex>
                  <VStack {...searchBoxUsersStyle}>
                    {searchList?.map(({ _id, avatar, username, fullName }) => (
                      <Flex
                        key={_id}
                        {...searchRecentStyle}
                        title={username}
                        onClick={() => {
                          navigate(`/profile/${username}`);
                          onClose();
                        }}
                      >
                        <Flex gap={"3"} alignItems={"center"}>
                          <Avatar size="md" src={avatar?.url} />
                          <VStack align={"flex-start"} gap={"0"}>
                            <Text>{username}</Text>
                            <Text fontSize={"0.8rem"} color={"gray"}>
                              {fullName}
                            </Text>
                          </VStack>
                        </Flex>
                        <Box
                          as={RxCross2}
                          {...recentCrossStyle}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(removeUserFromSearchList({ _id }));
                          }}
                        />
                      </Flex>
                    ))}
                  </VStack>
                </Box>
              ) : isLoading ? (
                <SearchSkeleton />
              ) : (
                searchValue?.length === 0 && (
                  <Flex align="center" justify="center" w="100%" py="3rem">
                    No recent searches.
                  </Flex>
                )
              )}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {clearRecentDisclosure.isOpen && (
        <ClearRecentModal
          isOpen={clearRecentDisclosure.isOpen}
          onClose={clearRecentDisclosure.onClose}
        />
      )}
    </Box>
  );
};
