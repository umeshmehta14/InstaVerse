import { Flex } from "@chakra-ui/react";
import { RotatingLoader } from "../../components";
import { useSelector } from "react-redux";
import { GridBox } from "../Profile/Profile Components/GridBox";

export const Explore = () => {
  const { explorePosts } = useSelector((state) => state.post);
  const { isLoading } = useSelector((state) => state.user);

  return (
    <Flex
      w={"100%"}
      p={{ base: 0, md: "1rem" }}
      maxW={"975px"}
      margin={"0 auto"}
      mb={{ base: "4.2rem", md: "0.4rem" }}
    >
      {isLoading ? (
        <Flex justifyContent={"center"} alignItems={"center"} minH={"30vh"}>
          <RotatingLoader w={"50"} sw={"3"} />
        </Flex>
      ) : (
        <GridBox showingPost={explorePosts} />
      )}
    </Flex>
  );
};
