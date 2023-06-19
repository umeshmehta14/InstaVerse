import React, { useState } from "react";
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";

import { useAuth } from "../../../contexts";
import { useEffect } from "react";
import { editFormInput, editFormLabel } from "../../../styles/ProfileStyles";

const EditProfileModa = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { colorMode } = useColorMode();
  const [updateProfile, setUpdateProfile] = useState({
    avatarURL: "",
    firstName: "",
    lastName: "",
    username: "",
    bio: "",
    portfolio: "",
  });
  const { avatarURL, firstName, lastName, username, bio, portfolio } =
    updateProfile;

  const handleBioChange = (e) => {
    const { value } = e.target;
    if (value.length <= 150) {
      setUpdateProfile({ ...updateProfile, bio: value });
    }
  };

  useEffect(() => {
    setUpdateProfile(currentUser);
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "md" }}
      >
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "dark" ? "black.900" : "white.500"}
          mt={{ lg: "2rem" }}
        >
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalBody pb={6}>
            <VStack gap={"1rem"}>
              <VStack gap={"0.5rem"}>
                <Avatar size={"lg"} src={avatarURL} />
                <Button variant={"link-button"} fontSize={"1rem"}>
                  Change profile photo
                </Button>
              </VStack>
              <FormControl>
                <FormLabel sx={editFormLabel}>Username</FormLabel>
                <Input
                  placeholder="First name"
                  value={username}
                  sx={editFormInput}
                  onChange={(e) =>
                    setUpdateProfile({
                      ...updateProfile,
                      username: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel sx={editFormLabel}>First name</FormLabel>
                <Input
                  placeholder="First name"
                  value={firstName}
                  sx={editFormInput}
                  onChange={(e) =>
                    setUpdateProfile({
                      ...updateProfile,
                      firstName: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel sx={editFormLabel}>Last name</FormLabel>
                <Input
                  placeholder="Last name"
                  value={lastName}
                  sx={editFormInput}
                  onChange={(e) =>
                    setUpdateProfile({
                      ...updateProfile,
                      lastName: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl pos={"relative"}>
                <FormLabel sx={editFormLabel}>Bio</FormLabel>
                <Input
                  placeholder="Bio..."
                  sx={editFormInput}
                  onChange={handleBioChange}
                  value={bio}
                />
                <Text
                  pos={"absolute"}
                  bottom={"-1rem"}
                  right={"0.5rem"}
                  fontSize={"0.7rem"}
                  color={bio.length >= 145 ? "red" : ""}
                >{`${bio.length}/150`}</Text>
              </FormControl>

              <FormControl>
                <FormLabel sx={editFormLabel}>Add link</FormLabel>
                <Input
                  placeholder="Add link"
                  value={portfolio}
                  sx={editFormInput}
                  onChange={(e) =>
                    setUpdateProfile({
                      ...updateProfile,
                      portfolio: e.target.value,
                    })
                  }
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModa;
