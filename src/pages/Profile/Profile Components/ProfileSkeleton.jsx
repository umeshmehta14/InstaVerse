import React from "react";
import {
  AspectRatio,
  Box,
  Divider,
  Flex,
  GridItem,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
  useColorMode,
} from "@chakra-ui/react";

import { profileMainBox } from "../../../styles/ProfileStyles";
import { Grid } from "react-loader-spinner";
import ContentLoader from "react-content-loader";

const ProfileSkeleton = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      {...profileMainBox}
      w={"100%"}
      h={"100vh"}
      bg={colorMode === "dark" ? "black.700" : "white.500"}
    >
      <Box padding="6" boxShadow="lg">
        <SkeletonCircle size="20" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
      <Divider />
      <Flex gap={"1rem"}>
        <ContentLoader
          speed={2}
          width="100%"
          height={300}
          viewBox="0 0 400 300"
          backgroundColor={colorMode === "dark" ? "gray" : "#EDF2F7"}
          foregroundColor={colorMode === "dark" ? "#1A202C" : "#E2E8F0"}
        >
          <rect x="0" y="0" rx="6" ry="6" width="100%" height="300" />
        </ContentLoader>
        <ContentLoader
          speed={2}
          width="100%"
          height={300}
          viewBox="0 0 400 300"
          backgroundColor={colorMode === "dark" ? "gray" : "#EDF2F7"}
          foregroundColor={colorMode === "dark" ? "#1A202C" : "#E2E8F0"}
        >
          <rect x="0" y="0" rx="6" ry="6" width="100%" height="300" />
        </ContentLoader>
        <ContentLoader
          speed={2}
          width="100%"
          height={300}
          viewBox="0 0 400 300"
          backgroundColor={colorMode === "dark" ? "gray" : "#EDF2F7"}
          foregroundColor={colorMode === "dark" ? "#1A202C" : "#E2E8F0"}
        >
          <rect x="0" y="0" rx="6" ry="6" width="100%" height="300" />
        </ContentLoader>
      </Flex>
    </Flex>
  );
};

export default ProfileSkeleton;
