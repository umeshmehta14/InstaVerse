import React from "react";
import { Box, HStack, Text, VStack, useColorMode } from "@chakra-ui/react";

import { AiOutlineArrowLeft } from "../../../utils/Icons";
import { PostBox } from "../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import {
  mobilePostMainBoxStyle,
  mobileSinglePostHeading,
} from "../../../styles/SinglePostStyle";

const MobileSinglePost = ({ post }) => {
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
      <PostBox post={post} />
    </VStack>
  );
};

export default MobileSinglePost;
