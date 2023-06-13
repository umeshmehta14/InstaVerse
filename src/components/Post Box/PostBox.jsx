import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
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
  BsEmojiSunglasses,
} from "../../utils/Icons";
import { iconPostStyles, mainPostBoxStyles } from "../../styles/PostBoxStyles";

export const PostBox = ({ post }) => {
  const { colorMode } = useColorMode();

  const { username, mediaUrl, avatarURL, comments, content, createdAt } = post;

  return (
    <Box
      {...mainPostBoxStyles}
      bg={colorMode === "light" ? "white.500" : "black.900"}
    >
      <Flex px="3" py="1" align="center" justifyContent={"space-between"}>
        <Flex alignItems={"center"}>
          <Avatar size="sm" name={username} src={avatarURL} />
          <Text ml="2" fontWeight="semibold">
            {username}
          </Text>
        </Flex>
        <Popover>
          <PopoverTrigger>
            <Button fontSize={"1.5rem"} bg={"transparent"} borderRadius={"40%"}>
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

      <Image src={mediaUrl} alt="Post Image" w={"100%"} />

      <Flex {...iconPostStyles}>
        <Flex
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

        <Flex fontSize={"sm"} cursor={"pointer"}>
          <Text>Liked by </Text>
          <Text ml="1" color="blue.500" fontWeight="semibold">
            Jane Doe
          </Text>
          <Text ml="1" color="blue.500" fontWeight="semibold">
            and 15 others
          </Text>
        </Flex>

        <Flex fontSize={"sm"} gap="0.5rem">
          <Text fontWeight={"semibold"} cursor={"pointer"}>
            {username}
          </Text>{" "}
          {content}
        </Flex>

        <Flex>
          <Text fontSize={"sm"} color={"gray.400"} cursor={"pointer"}>
            View All Comments
          </Text>
        </Flex>
        <Text fontSize="xs" color={"gray.300"}>
          {` ${new Date(createdAt)
            .toDateString()
            .split(" ")
            .slice(1, 4)
            .join(" ")}`}
        </Text>
      </Flex>

      <Flex py="1" borderTop="1px solid gray" alignItems={"center"}>
        <Box
          as={BsEmojiSunglasses}
          fontSize={"1.8rem"}
          cursor="pointer"
          title="Emoji"
          ml="2"
        />

        <Input
          placeholder="Add a comment..."
          border={"none"}
          flex="1"
          mr="2"
          _focus={{ outline: "none", boxShadow: "none", border: "none" }}
        />
        <Button fontSize={"1rem"} variant={"link-button"} size="sm">
          Post
        </Button>
      </Flex>
    </Box>
  );
};
