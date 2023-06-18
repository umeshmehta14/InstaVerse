import {
  Box,
  SkeletonCircle,
  SkeletonText,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

const ProfileSkeleton = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      padding="6"
      boxShadow="lg"
      bg={colorMode === "dark" ? "black.900" : "white.500"}
      w={"100%"}
      h={"100vh"}
    >
      <SkeletonCircle size="20" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export default ProfileSkeleton;