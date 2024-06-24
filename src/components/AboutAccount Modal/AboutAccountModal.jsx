import {
  Avatar,
  Box,
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";

import {
  aboutAccountIconMain,
  simpleButton,
  smTextModalStyle,
} from "../../styles/GlobalStyles";
import { CiCalendarDate, CiLocationOn } from "../../utils/Icons";

export const AboutAccountModal = ({
  isOpen,
  onClose,
  username,
  url,
  createdAt,
}) => {
  const { colorMode } = useColorMode();

  const date = new Date(createdAt);
  const options = { year: "numeric", month: "long" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={colorMode === "dark" ? "black.600" : "white.500"}
        maxWidth={"390px"}
        borderRadius={"16px"}
      >
        <ModalHeader textAlign={"center"} p={"0.6rem"}>
          About this account
        </ModalHeader>
        <VStack
          bg={colorMode === "dark" ? "black.900" : "white.500"}
          pt={"1.5rem"}
          pb={"0.5rem"}
        >
          <Avatar size={"xl"} src={url} />
          <Text m="0.5rem">{username}</Text>
          <Text {...smTextModalStyle}>
            To help keep our community authentic, we're showing information
            about accounts on Instaverse.
          </Text>

          <Flex {...aboutAccountIconMain}>
            <Flex align={"center"} gap={"0.5rem"}>
              <Box as={CiCalendarDate} fontSize={"2rem"} />
              <Box>
                <Text>Date joined</Text>
                <Text color={"gray"} fontSize={"0.9rem"}>
                  {formattedDate}
                </Text>
              </Box>
            </Flex>
            <Flex align={"center"} gap={"0.5rem"}>
              <Box as={CiLocationOn} fontSize={"2rem"} />
              <Box>
                <Text>Account based in</Text>
                <Text color={"gray"} fontSize={"0.9rem"}>
                  Bharat
                </Text>
              </Box>
            </Flex>
          </Flex>
        </VStack>
        <ModalFooter p={"0.4rem"}>
          <Button sx={simpleButton} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
