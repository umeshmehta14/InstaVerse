import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

import ContentLoader from "react-content-loader";
import { mainPostBoxStyles } from "../../styles/PostBoxStyles";

export const PostBoxSkeleton = () => {
  const { colorMode } = useColorMode();
  return (
    <Box {...mainPostBoxStyles} mx={"auto"}>
      <Flex
        display={{ base: "flex", md: "flex" }}
        gap={"2"}
        my={"2"}
        w={"80%"}
        alignItems={"center"}
        padding={"8px"}
      >
        <SkeletonCircle size="12" />
        <SkeletonText noOfLines={2} spacing="4" skeletonHeight="2" w={"80%"} />
      </Flex>
      <ContentLoader
        speed={2}
        width="100%"
        height={500}
        backgroundColor={colorMode === "dark" ? "gray" : "#EDF2F7"}
        foregroundColor={colorMode === "dark" ? "#1A202C" : "#E2E8F0"}
      >
        <rect x="0" y="0" rx="6" ry="6" width="100%" height={500} />
      </ContentLoader>
    </Box>
  );
};
