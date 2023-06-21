import React from "react";
import { Box, HStack, Text, VStack, useColorMode } from "@chakra-ui/react";

import { AiOutlineArrowLeft } from "../../../utils/Icons";
import { PostBox } from "../../../components";
import { useLocation, useNavigate } from "react-router-dom";

const MobileSinglePost = ({ post }) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <VStack
      h="92vh"
      zIndex="5"
      pos="fixed"
      top="0"
      bg={colorMode === "dark" ? "black.700" : "white.500"}
      align={"flex-start"}
      gap={"1rem"}
    >
      <HStack
        p="0.5rem"
        align={"center"}
        gap={"1rem"}
        display={{ base: "flex", md: "none" }}
        bg={colorMode === "dark" ? "black.900" : "white.500"}
        w={"100%"}
      >
        <Box
          as={AiOutlineArrowLeft}
          fontSize={"1.8rem"}
          onClick={() => navigate(location?.state?.from?.pathname)}
        />
        <Text>Post</Text>
      </HStack>
      <PostBox post={post} />
    </VStack>
  );
};

export default MobileSinglePost;
