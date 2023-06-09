import React, { useState, useRef, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  Divider,
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
  useDisclosure,
} from "@chakra-ui/react";

import { useAuth, useUser } from "../../../contexts";
import { AvatarModal } from "../../index";
import {
  inputLengthReader,
  simpleButton,
  editFormInput,
  editFormLabel,
} from "../../../styles/GlobalStyles";
import { AiOutlinePicture, SlTrash, RxAvatar } from "../../../utils/Icons";

export const EditProfileModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { handleEditUser } = useUser();
  const { colorMode } = useColorMode();
  const fileInputRef = useRef(null);
  const cancelRef = useRef();

  const discardDisclosure = useDisclosure();
  const avatarDisclosure = useDisclosure();

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

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setUpdateProfile({
      ...updateProfile,
      avatarURL: URL.createObjectURL(file),
    });
  };

  const handleCartoonAvatar = (url) => {
    setUpdateProfile({
      ...updateProfile,
      avatarURL: url,
    });
  };

  const handleEditSubmission = () => {
    handleEditUser(updateProfile);
    onClose();
  };

  useEffect(() => {
    setUpdateProfile(currentUser);
  }, [isOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "md" }}
        closeOnOverlayClick={false}
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
                      <Divider />
                      <Button
                        w="100%"
                        justifyContent={"flex-start"}
                        gap={2}
                        onClick={avatarDisclosure.onOpen}
                      >
                        <Box as={RxAvatar} fontSize={"1.5rem"} />
                        Change Avatar
                      </Button>
                      <Divider />
                      {avatarDisclosure.isOpen && (
                        <AvatarModal
                          isOpen={avatarDisclosure.isOpen}
                          onClose={avatarDisclosure.onClose}
                          handleCartoonAvatar={handleCartoonAvatar}
                        />
                      )}
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
                  onChange={handleAvatarChange}
                />
              </VStack>

              <FormControl>
                <FormLabel sx={editFormLabel}>First name</FormLabel>
                <Input
                  placeholder="First name"
                  value={firstName}
                  sx={editFormInput}
                  maxLength={25}
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
                  maxLength={25}
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
                  {...inputLengthReader}
                  color={bio?.length >= 145 ? "red" : ""}
                >{`${bio?.length || 0}/150`}</Text>
              </FormControl>

              <FormControl>
                <FormLabel sx={editFormLabel}>Add link</FormLabel>
                <Input
                  placeholder="Add link"
                  value={portfolio}
                  sx={editFormInput}
                  maxLength={50}
                  onChange={(e) =>
                    setUpdateProfile({
                      ...updateProfile,
                      portfolio: e.target.value,
                    })
                  }
                  color={colorMode === "dark" ? "blue.200" : "blue.500"}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditSubmission}>
              Save
            </Button>
            <Button onClick={discardDisclosure.onOpen}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {discardDisclosure.isOpen && (
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={discardDisclosure.onClose}
          isOpen={discardDisclosure.isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent
            bg={colorMode === "dark" ? "black.600" : "white.500"}
            w={"350px"}
          >
            <AlertDialogHeader pb={0} textAlign={"center"}>
              Discard Changes?
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text color={"gray"} textAlign={"center"} pb={"1rem"}>
                If you leave, your edits won't be saved.
              </Text>
              <Button
                sx={simpleButton}
                color={"red.500"}
                onClick={() => {
                  discardDisclosure.onClose();
                  onClose();
                }}
              >
                Discard
              </Button>
              <Divider />
              <Button sx={simpleButton} onClick={discardDisclosure.onClose}>
                Cancel
              </Button>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
