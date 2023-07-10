import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, HStack, Text, VStack, useColorMode } from "@chakra-ui/react";

import { PostBox } from "../../../components";
import {
  mobilePostMainBoxStyle,
  mobileSinglePostHeading,
} from "../../../styles/SinglePostStyle";
import { AiOutlineArrowLeft } from "../../../utils/Icons";

export const MobileSinglePost = ({ post }) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <VStack
      bg={colorMode === "dark" ? "black.700" : "white.500"}
      {...mobilePostMainBoxStyle}
    >
      <HStack
        bg={colorMode === "dark" ? "black.900" : "white.500"}
        {...mobileSinglePostHeading}
      >
        <Box
          as={AiOutlineArrowLeft}
          fontSize={"1.8rem"}
          onClick={() => navigate(location?.state?.from?.pathname)}
        />
        <Text>Post</Text>
      </HStack>
      <Box m="auto">
        <PostBox post={post} />
      </Box>
    </VStack>
  );
};
