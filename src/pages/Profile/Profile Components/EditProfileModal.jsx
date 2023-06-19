import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";

import { useAuth, useUser } from "../../../contexts";
import { AiOutlinePicture, SlTrash } from "../../../utils/Icons";
import { editFormInput, editFormLabel } from "../../../styles/ProfileStyles";

const EditProfileModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { handleEditUser } = useUser();
  const { colorMode } = useColorMode();
  const fileInputRef = useRef(null);

  const [updateProfile, setUpdateProfile] = useState(currentUser);
  const { avatarURL, firstName, lastName, bio, portfolio } = updateProfile;

  const handleBioChange = (e) => {
    const { value } = e.target;
    if (value?.length <= 150) {
      setUpdateProfile({ ...updateProfile, bio: value });
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleAvatartChange = (event) => {
    const file = event.target.files[0];
    setUpdateProfile({
      ...updateProfile,
      avatarURL: URL.createObjectURL(file),
    });
  };

  const handleEditSubmission = () => {
    handleEditUser(updateProfile);
    onClose();
  };

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
                <Popover>
                  <PopoverTrigger>
                    <Button variant={"link-button"} fontSize={"1rem"}>
                      Change profile photo
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    bg={colorMode === "light" ? "white.500" : "black.900"}
                    p={"1rem"}
                  >
                    <PopoverCloseButton />
                    <PopoverArrow />
                    <PopoverBody>
                      <Button
                        w="100%"
                        justifyContent={"flex-start"}
                        gap={2}
                        onClick={handleFileSelect}
                      >
                        <Box as={AiOutlinePicture} fontSize={"1.5rem"} /> New
                        profile picture
                      </Button>
                      {avatarURL?.length > 0 && (
                        <Button
                          w="100%"
                          justifyContent={"flex-start"}
                          color={"red.500"}
                          gap={2}
                          onClick={() =>
                            setUpdateProfile({
                              ...updateProfile,
                              avatarURL: "",
                            })
                          }
                        >
                          <Box as={SlTrash} fontSize={"1.5rem"} /> Remove
                          current picture
                        </Button>
                      )}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
                <Input
                  type="file"
                  accept="image/*"
                  display="none"
                  ref={fileInputRef}
                  onChange={handleAvatartChange}
                />
              </VStack>

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
                  color={bio?.length >= 145 ? "red" : ""}
                >{`${bio?.length}/150`}</Text>
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
            <Button colorScheme="blue" mr={3} onClick={handleEditSubmission}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
