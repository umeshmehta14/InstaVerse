import React, { useEffect } from "react";

import {
  Flex,
  Box,
  Avatar,
  Text,
  Button,
  Grid,
  GridItem,
  Divider,
  Image,
} from "@chakra-ui/react";
import { useUser } from "../../contexts";
import { useNavigate, useParams } from "react-router-dom";
import { SET_SELECTED_USER } from "../../utils/Constants";

export const Profile = () => {
  const navigate = useNavigate();
  const {
    handleSingleUser,
    userState: { selectedUser },
    userDispatch,
  } = useUser();

  const paramUser = useParams();

  const getUser = async () => {
    const responseUser = await handleSingleUser(paramUser);
    userDispatch({ type: SET_SELECTED_USER, payload: responseUser });
  };

  const { _id, username, avatarURL, bio, following, followers } = selectedUser;

  useEffect(() => {
    getUser();
    if (_id.length === 0) {
      navigate("/");
    }
  }, [selectedUser]);

  return (
    <Flex direction="column" align="center" p={4}>
      <Box mb={4}>
        <Avatar size="xl" src={avatarURL} alt="Profile Picture" />
      </Box>

      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        {username}
      </Text>

      <Text fontSize="lg" color="gray.500" mb={4}>
        {bio}
      </Text>
      <Text>Follower {followers.length}</Text>
      <Text>Following {following.length}</Text>
      <Flex>
        <Button variant="outline" size="sm" mr={2}>
          Edit Profile
        </Button>
        <Button variant="outline" size="sm">
          Logout
        </Button>
      </Flex>

      <Divider my={4} />

      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem>
          <Image
            src="https://via.placeholder.com/300"
            alt="Post"
            boxSize="300px"
            objectFit="cover"
          />
        </GridItem>
        <GridItem>
          <Image
            src="https://via.placeholder.com/300"
            alt="Post"
            boxSize="300px"
            objectFit="cover"
          />
        </GridItem>
        <GridItem>
          <Image
            src="https://via.placeholder.com/300"
            alt="Post"
            boxSize="300px"
            objectFit="cover"
          />
        </GridItem>
        <GridItem>
          <Image
            src="https://via.placeholder.com/300"
            alt="Post"
            boxSize="300px"
            objectFit="cover"
          />
        </GridItem>
        <GridItem>
          <Image
            src="https://via.placeholder.com/300"
            alt="Post"
            boxSize="300px"
            objectFit="cover"
          />
        </GridItem>
        <GridItem>
          <Image
            src="https://via.placeholder.com/300"
            alt="Post"
            boxSize="300px"
            objectFit="cover"
          />
        </GridItem>
      </Grid>
    </Flex>
  );
};
