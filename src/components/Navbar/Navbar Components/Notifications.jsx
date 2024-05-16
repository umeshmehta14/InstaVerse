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
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Notifications = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size={{ base: "full", md: "xs" }}
      >
        <DrawerOverlay />
        <DrawerContent
          bg={colorMode === "dark" ? "black.900" : "white.500"}
          borderRight={"0.5px solid gray"}
        >
          <DrawerCloseButton display={{ base: "none", md: "inline-block" }} />
          <DrawerHeader
            display={"flex"}
            justifyContent={"space-between"}
            w={"75%"}
          >
            <Box
              as={AiOutlineArrowLeft}
              fontSize={"1.8rem"}
              onClick={() => onClose()}
            />
            <Text>Notifications</Text>
          </DrawerHeader>
          <Divider />

          <DrawerBody>hello</DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Notifications;
