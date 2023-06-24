import React from "react";
import { VStack } from "@chakra-ui/react";
import ContentLoader from "react-content-loader";

export const PostFeedSkeleton = () => {
  return (
    <VStack spacing={4} align="stretch">
      <ContentLoader
        speed={2}
        width="100%"
        height={500}
        viewBox="0 0 400 500"
        backgroundColor="#EDF2F7"
        foregroundColor="#E2E8F0"
      >
        <rect x="0" y="0" rx="6" ry="6" width="100%" height="400" />
        <rect x="16" y="420" rx="3" ry="3" width="120" height="12" />
        <rect x="16" y="440" rx="3" ry="3" width="80" height="10" />
        <rect x="16" y="460" rx="3" ry="3" width="150" height="10" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        width="100%"
        height={500}
        viewBox="0 0 400 500"
        backgroundColor="#EDF2F7"
        foregroundColor="#E2E8F0"
      >
        <rect x="0" y="0" rx="6" ry="6" width="100%" height="400" />
        <rect x="16" y="420" rx="3" ry="3" width="120" height="12" />
        <rect x="16" y="440" rx="3" ry="3" width="80" height="10" />
        <rect x="16" y="460" rx="3" ry="3" width="150" height="10" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        width="100%"
        height={500}
        viewBox="0 0 400 500"
        backgroundColor="#EDF2F7"
        foregroundColor="#E2E8F0"
      >
        <rect x="0" y="0" rx="6" ry="6" width="100%" height="400" />
        <rect x="16" y="420" rx="3" ry="3" width="120" height="12" />
        <rect x="16" y="440" rx="3" ry="3" width="80" height="10" />
        <rect x="16" y="460" rx="3" ry="3" width="150" height="10" />
      </ContentLoader>
    </VStack>
  );
};
