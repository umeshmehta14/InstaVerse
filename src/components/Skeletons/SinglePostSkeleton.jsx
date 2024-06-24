import {
  Box,
  Divider,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SkeletonCircle,
  SkeletonText,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  commentSectionMain,
  mediaPostBox,
  mobileCommentHeading,
  modalContentStyle,
  singlePostModalClose,
} from "../../styles/SinglePostStyle";
import { iconPostStyles } from "../../styles/PostBoxStyles";
import { AiOutlineArrowLeft } from "../../utils/Icons";
import { hideScrollbar } from "../../styles/GlobalStyles";

export const SinglePostSkeleton = ({ redirectLocation, onClose }) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Modal
      onClose={onClose}
      size={{ base: "full", md: "lg", lg: "xl" }}
      isOpen={true}
      maxW="auto"
    >
      <ModalOverlay />
      <ModalContent
        bg={colorMode === "dark" ? "black.900" : "white.500"}
        {...modalContentStyle}
      >
        <ModalCloseButton
          color={colorMode === "dark" ? "white" : "black"}
          {...singlePostModalClose}
          onClick={() => navigate(redirectLocation)}
        />
        <ModalBody p={0} height={"100%"}>
          <HStack
            align={"flex-start"}
            height={{ base: "100vh", md: "600px" }}
            gap={"0"}
          >
            <Box
              {...mediaPostBox}
              backgroundColor={"#8b8b8b"}
              height={"100%"}
              width={"100%"}
            />
            <Flex
              {...commentSectionMain}
              bg={
                colorMode === "dark"
                  ? { base: "black.900", md: "#1a1a1a" }
                  : "white.500"
              }
              height={"100%"}
            >
              <HStack {...mobileCommentHeading}>
                <Box
                  as={AiOutlineArrowLeft}
                  fontSize={"1.8rem"}
                  onClick={() =>
                    navigate(
                      location?.pathname === redirectLocation
                        ? `/profile/${profileUser?.username}`
                        : redirectLocation
                    )
                  }
                />
              </HStack>

              <Flex
                display={{ base: "none", md: "flex" }}
                gap={"2"}
                my={"2"}
                w={"80%"}
                alignItems={"center"}
                padding={"8px"}
              >
                <SkeletonCircle size="12" />
                <SkeletonText
                  noOfLines={2}
                  spacing="4"
                  skeletonHeight="2"
                  w={"80%"}
                />
              </Flex>
              <Divider />
              <VStack
                bg={
                  colorMode === "dark"
                    ? { base: "black.900", md: "#1a1a1a" }
                    : "white.500"
                }
                p={"8px"}
                overflow={"hidden"}
                maxH={{ base: "100%", md: "360px" }}
                sx={hideScrollbar}
              >
                {new Array(10).fill(null)?.map((_, index) => (
                  <Flex
                    gap={"2"}
                    my={"2"}
                    w={"100%"}
                    alignItems={"center"}
                    key={index}
                  >
                    <SkeletonCircle size="12" />
                    <SkeletonText
                      noOfLines={2}
                      spacing="4"
                      skeletonHeight="2"
                      w={{ base: "90%", md: "50%" }}
                    />
                  </Flex>
                ))}
              </VStack>

              <Divider display={{ base: "none", md: "flex" }} />
              <Flex
                {...iconPostStyles}
                display={{ base: "none", md: "flex" }}
                p={"10px"}
              >
                <SkeletonText
                  noOfLines={3}
                  spacing="4"
                  skeletonHeight="3"
                  w={"50%"}
                />
              </Flex>
            </Flex>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
