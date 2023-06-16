import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { useAuth, usePost } from "../../contexts";
import {
  filterButton,
  userSuggestionContainer,
  userSuggestionMainProfile,
} from "../../styles/UserSuggestionStyles";
import SwitchAccountModal from "./UserSuggestion Components/SwitchAccountModal";
import { SET_FILTER } from "../../utils/Constants";
import { LuFilter } from "../../utils/Icons";
import UserSuggestionMain from "./UserSuggestion Components/UserSuggestionMain";

export const UserSuggestion = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  const { currentUser } = useAuth();
  const { postDispatch } = usePost();

  return (
    <Box sx={userSuggestionContainer}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        display={{ base: "none", lg: "flex" }}
      >
        <Flex
          sx={userSuggestionMainProfile}
          title={currentUser.username}
          cursor={"pointer"}
          onClick={() => navigate(`/profile/${currentUser.username}`)}
        >
          <Avatar
            size="lg"
            name={currentUser.username}
            src={
              currentUser.avatarURL ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAeY_IFrsiUIvvfnSvAcmrdoNUprysMGfCQ&usqp=CAU"
            }
          />
          <Text fontWeight={"normal"} justifySelf={"flex-end"}>
            {currentUser.username}
          </Text>
        </Flex>
        <Button variant={"link-button"} onClick={onOpen}>
          Switch
        </Button>

        <Modal onClose={onClose} size={"sm"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent bg={colorMode === "light" ? "white.500" : "black.700"}>
            <ModalHeader borderBottom={"1px solid gray"}>
              Switch Accounts
            </ModalHeader>
            <ModalCloseButton _hover={{ bg: "red", color: "white" }} />
            <SwitchAccountModal onClose={onClose} />
          </ModalContent>
        </Modal>
      </Flex>

      {location?.pathname !== "/explore" && (
        <Menu closeOnSelect={false}>
          <MenuButton width="fit-content" ml="1rem">
            <Text sx={filterButton}>
              Filter Posts <Box as={LuFilter} />
            </Text>
          </MenuButton>
          <MenuList minWidth="200px">
            <MenuOptionGroup defaultValue="latest" title="Sort By" type="radio">
              <MenuItemOption
                onClick={() =>
                  postDispatch({ type: SET_FILTER, payload: "latest" })
                }
                value="latest"
              >
                Latest
              </MenuItemOption>
              <MenuItemOption
                onClick={() =>
                  postDispatch({ type: SET_FILTER, payload: "trending" })
                }
                value="trending"
              >
                Trending
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      )}
      <UserSuggestionMain />
    </Box>
  );
};
