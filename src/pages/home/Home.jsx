import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Text,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { AiOutlineHeart, FaRegComment, IoPaperPlaneOutline } from "../../utils/Icons";

export const Home = () => {


  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      {/* Header */}
      <Flex p="3" align="center">
        <Avatar size="sm" name="John Doe" src="https://bit.ly/dan-abramov" />
        <Text ml="2" fontWeight="semibold">
          John Doe
        </Text>
      </Flex>

      {/* Image */}
      <Image src="https://placekitten.com/500/300" alt="Post Image" />

      {/* Actions */}
      <Flex p="3">
        <IconButton
          variant="ghost"
          color="gray.500"
          icon={<AiOutlineHeart />}
          aria-label="Like"
          size="md"
        />
        <IconButton
          variant="ghost"
          color="gray.500"
          icon={<FaRegComment />}
          aria-label="Comment"
          size="md"
        />
        <IconButton
          variant="ghost"
          color="gray.500"
          icon={<IoPaperPlaneOutline />}
          aria-label="Share"
          size="md"
        />
      </Flex>

      {/* Likes */}
      <Flex p="3">
        <Text fontWeight="semibold">Liked by </Text>
        <Text ml="1" fontWeight="semibold" color="blue.500">
          Jane Doe
        </Text>
        <Text ml="1" fontWeight="semibold" color="blue.500">
          and 15 others
        </Text>
      </Flex>

      {/* Comments */}
      <Flex p="3">
        <Text fontWeight="semibold" mr="1">
          John Doe:
        </Text>
        <Text>Beautiful picture!</Text>
      </Flex>
      <Flex p="3">
        <Text fontWeight="semibold" mr="1">
          Jane Doe:
        </Text>
        <Text>Nice shot!</Text>
      </Flex>
    </Box>
  );
};
