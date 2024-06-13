import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, HStack, Text, VStack, useColorMode } from "@chakra-ui/react";

import { PostBox, PostBoxSkeleton } from "../../../components";
import {
  mobilePostMainBoxStyle,
  mobileSinglePostHeading,
} from "../../../styles/SinglePostStyle";
import { AiOutlineArrowLeft } from "../../../utils/Icons";
import { useSelector } from "react-redux";
import { hideScrollbar } from "../../../styles/GlobalStyles";

export const MobileSinglePost = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    singlePost: { post, postLoading },
  } = useSelector((state) => state.post);

  return (
    <VStack
      bg={colorMode === "dark" ? "black.900" : "white.500"}
      {...mobilePostMainBoxStyle}
      sx={hideScrollbar}
    >
      <HStack
        bg={colorMode === "dark" ? "black.900" : "white.500"}
        {...mobileSinglePostHeading}
      >
        <Box
          as={AiOutlineArrowLeft}
          fontSize={"1.8rem"}
          onClick={() =>
            navigate(
              location?.state?.from?.pathname ||
                `/profile/${post?.owner?.username}`
            )
          }
        />
        <Text>Post</Text>
      </HStack>
      <Box w="100%" h={"86vh"}>
        {postLoading && post?.url ? (
          <PostBoxSkeleton />
        ) : (
          <PostBox post={post} singlePost={true} />
        )}
      </Box>
    </VStack>
  );
};
