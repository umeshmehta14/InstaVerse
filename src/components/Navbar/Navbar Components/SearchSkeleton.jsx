import { Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";

const SearchSkeleton = () => {
  return (
    <>
      {new Array(8).fill(null)?.map((_, index) => (
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
    </>
  );
};

export default SearchSkeleton;
