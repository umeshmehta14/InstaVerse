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

import { RxCrossCircled } from "../../../utils/Icons";
import { useAuth, useUser } from "../../../contexts";
import { SET_SEARCH_VALUE } from "../../../utils/Constants";
import { useNavigate } from "react-router-dom";

const SearchBox = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  const {
    userState: { searchValue, searchedUsers },
    userDispatch,
  } = useUser();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  console.log(searchedUsers);

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
          <DrawerBody>
            <InputGroup mb={"1rem"}>
              <Input
                placeholder="Search..."
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
                const { _id, avatarURL, username, firstName, lastName } = user;
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
                      <Avatar
                        size="md"
                        name={firstName}
                        src={
                          avatarURL ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAeY_IFrsiUIvvfnSvAcmrdoNUprysMGfCQ&usqp=CAU"
                        }
                      />
                    </Flex>
                    <VStack align={"flex-start"} gap={"0"}>
                      <Text>{username}</Text>
                      <Text
                        fontSize={"0.8rem"}
                        color={"gray"}
                      >{`${firstName} ${lastName}`}</Text>
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
