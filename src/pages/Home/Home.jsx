import React from "react";

import { PostBox, UserSuggestion } from "../../components";
import { Flex, VStack } from "@chakra-ui/react";
import { usePost } from "../../contexts";

export const Home = () => {

  const {postState:{posts}} = usePost();

  return (
    <Flex
      gap={"1rem"}
      w="100%"
      flexDir={{ base: "column", lg: "row-reverse" }}
      justifyContent={"center"}
      mt={"1rem"}
      alignItems={{base:"center",lg:"baseline"}}
    >
      <UserSuggestion/>
      <VStack alignItems={"flex-end"}>
        {
          posts.map((post)=><PostBox key={post._id} post={post}/>)
        }
      </VStack>
    </Flex>
  );
};
