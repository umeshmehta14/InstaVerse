import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import {
  AiOutlineHeart,
  FaRegComment,
  IoPaperPlaneOutline,
  BsThreeDots,
  FiBookmark,
} from "../../utils/Icons";
import { usePost } from "../../contexts";

export const Home = () => {
  const {
    state: { users },
  } = usePost();
  const { colorMode } = useColorMode();

  return (
    <Flex gap={"1rem"} w="100%" flexDir={{ base: "column", lg: "row-reverse" }}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        w={{ lg: "30%" }}
        maxW={{ lg: "300px" }}
      >
        <Flex p="3" align="center">
          <Text fontWeight="semibold" mx={"auto"}>
            Suggestions For You
          </Text>
        </Flex>

        <Flex
          flexDir={{ base: "row", lg: "column" }}
          w={{ base: "100vw", md: "auto" }}
          overflow={"auto"}
          overflowX={{ base: "auto", md: "hidden" }}
        >
          {users.map((user) => (
            <Flex
              p="3"
              align="center"
              key={user._id}
              flexDir={{ base: "column", lg: "row" }}
              minW={{ base: "130px", lg: "auto" }}
              rowGap={"0.5rem"}
              outline={{ base: "0.5px solid gray", lg: "none" }}
              justifyContent={"space-between"}
            >
              <Flex
                flexDir={{ base: "column", lg: "row" }}
                align={"center"}
                gap={"0.5rem"}
              >
                <Avatar
                  size={{ base: "md", md: "sm" }}
                  name={user.firstName}
                  src={user.avatarURL}
                />
                <Box>
                  <Text fontSize="sm">{user.username}</Text>
                </Box>
              </Flex>
              <Button variant={"link-button"} size="sm" colorScheme="blue">
                Follow
              </Button>
            </Flex>
          ))}
        </Flex>
      </Box>

      <Box
        maxW="468px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={colorMode === "light" ? "white.500" : "black.900"}
        h={"fit-content"}
      >
        <Flex px="3" py="1" align="center" justifyContent={"space-between"}>
          <Flex alignItems={"center"}>
            <Avatar
              size="sm"
              name="John Doe"
              src="https://bit.ly/dan-abramov"
            />
            <Text ml="2" fontWeight="semibold">
              John Doe
            </Text>
          </Flex>
          <Popover>
            <PopoverTrigger>
              <Button
                fontSize={"1.5rem"}
                bg={"transparent"}
                borderRadius={"40%"}
              >
                <BsThreeDots cursor={"pointer"} />
              </Button>
            </PopoverTrigger>
            <PopoverContent w={"fit-content"}>
              <PopoverArrow />
              <PopoverBody>
                <Button>Edit</Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>

        <Image src="https://placekitten.com/500/300" alt="Post Image" />

        <Flex
          p="3"
          fontSize={"1.7rem"}
          color={colorMode === "light" ? "black" : "white"}
          justifyContent={"space-between"}
        >
          <HStack justifyContent={"space-between"} w={"40%"}>
            <Box
              as={AiOutlineHeart}
              cursor="pointer"
              _hover={{ color: "gray" }}
              title="Like"
            />
            <Box
              as={FaRegComment}
              cursor="pointer"
              _hover={{ color: "gray" }}
              title="Comment"
            />
            <Box
              as={IoPaperPlaneOutline}
              cursor="pointer"
              _hover={{ color: "gray" }}
              title="Share"
            />
          </HStack>
          <HStack>
            <Box
              as={FiBookmark}
              cursor="pointer"
              _hover={{ color: "gray" }}
              title="Save"
            />
          </HStack>
        </Flex>

        <Text p="3">
          <strong>Profile Name</strong> Beautiful kittten man
        </Text>

        <Flex px="3">
          <Text fontWeight="semibold">Liked by </Text>
          <Text ml="1" fontWeight="semibold" color="blue.500">
            Jane Doe
          </Text>
          <Text ml="1" fontWeight="semibold" color="blue.500">
            and 15 others
          </Text>
        </Flex>

        <Flex p="3">
          <Text fontWeight="semibold" mr="1">
            John Doe:
          </Text>
          <Text>Beautiful picture!</Text>
        </Flex>
      </Box>
    </Flex>
  );
};
