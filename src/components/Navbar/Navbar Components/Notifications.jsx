import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorMode,
  Divider,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineArrowLeft } from "../../../utils/Icons";
import { NotificationItem, SearchSkeleton } from "../../index";
import { UnfollowModal } from "../../Unfollow Modal/UnfollowModal";
import {
  getUserNotifications,
  readUserNotifications,
} from "../../../pages/Post Feed/postSlice";

export const Notifications = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  const { notifications, notificationLoader } = useSelector(
    (state) => state.post
  );

  const [unfollowUser, setUnfollowUser] = useState({});
  const dispatch = useDispatch();

  const unfollowModalDisclosure = useDisclosure();

  const notificationItems = useMemo(
    () =>
      notifications?.map((notification) => (
        <NotificationItem
          key={notification?._id}
          {...notification}
          onClose={onClose}
          setUnfollowUser={setUnfollowUser}
          unfollowModalDisclosure={unfollowModalDisclosure}
        />
      )),
    [notifications, onClose, setUnfollowUser, unfollowModalDisclosure]
  );

  useEffect(() => {
    if (notifications?.length > 0) {
      dispatch(readUserNotifications());
    }
  }, [notifications, onClose, isOpen]);

  return (
    <Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={() => {
          dispatch(getUserNotifications());
          onClose();
        }}
        size={{ base: "full", md: "sm" }}
      >
        <DrawerOverlay />
        <DrawerContent
          bg={colorMode === "dark" ? "black.900" : "white.500"}
          borderRight="0.5px solid gray"
        >
          <DrawerCloseButton display={{ base: "none", md: "inline-block" }} />
          <DrawerHeader display="flex" justifyContent="space-between" w="75%">
            <Box
              as={AiOutlineArrowLeft}
              fontSize="1.8rem"
              onClick={onClose}
              display={{ base: "inline-block", md: "none" }}
            />
            <Text>Notifications</Text>
          </DrawerHeader>
          <Divider />

          <DrawerBody>
            {notificationLoader ? (
              <SearchSkeleton />
            ) : (
              <VStack maxW="100%">{notificationItems}</VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {unfollowModalDisclosure.isOpen && (
        <UnfollowModal
          isOpen={unfollowModalDisclosure.isOpen}
          onClose={unfollowModalDisclosure.onClose}
          {...unfollowUser}
        />
      )}
    </Box>
  );
};
