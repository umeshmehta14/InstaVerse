import { Flex, SkeletonCircle, SkeletonText, VStack } from "@chakra-ui/react";
import React from "react";

const SearchSkeleton = () => {
  return (
    <VStack w={"100%"}>
      {new Array(20).fill(null)?.map((_, index) => (
        <Flex gap={"2"} my={"2"} w={"100%"} key={index}>
          <SkeletonCircle size="12" />
          <SkeletonText
            mt="4"
            noOfLines={2}
            spacing="4"
            skeletonHeight="2"
            w={"80%"}
          />
        </Flex>
      ))}
    </VStack>
  );
};

export default SearchSkeleton;
