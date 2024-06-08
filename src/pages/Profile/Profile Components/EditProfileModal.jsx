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
import { AvatarModal } from "../../index";
import {
  inputLengthReader,
  simpleButton,
  editFormInput,
  editFormLabel,
} from "../../../styles/GlobalStyles";
import { AiOutlinePicture, SlTrash, RxAvatar } from "../../../utils/Icons";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile } from "../../Post Feed/userSlice";
import toast from "react-hot-toast";

export const EditProfileModal = ({ isOpen, onClose }) => {
  const { currentUser } = useSelector((state) => state.authentication);
  const { colorMode } = useColorMode();
  const fileInputRef = useRef(null);
  const cancelRef = useRef();
  const dispatch = useDispatch();

  const discardDisclosure = useDisclosure();
  const avatarDisclosure = useDisclosure();

  const initialEditData = {
    username: currentUser?.username,
    avatar: currentUser?.avatar.url,
    fullName: currentUser?.fullName,
    portfolio: currentUser?.portfolio,
    bio: currentUser?.bio,
    picture: "",
  };

  const [updateProfile, setUpdateProfile] = useState(initialEditData);
  const [selectedPicture, setSelectedPicture] = useState("");

  const { avatar, fullName, bio, portfolio, username, picture } = updateProfile;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "bio" && value.length > 150) return;
    setUpdateProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setUpdateProfile((prev) => ({
      ...prev,
      picture: file,
      avatar: "",
    }));
    setSelectedPicture(URL.createObjectURL(file));
  };

  const handleCartoonAvatar = (url) => {
    setUpdateProfile((prev) => ({
      ...prev,
      avatar: url,
      picture: "",
    }));
  };

  const handleEditSubmission = () => {
    if (currentUser.guest) {
      toast.error("Guest user cannot edit profile");
      onClose();
      return;
    }
    if (
      username === currentUser?.username &&
      avatar === currentUser?.avatar.url &&
      fullName === currentUser?.fullName &&
      portfolio === currentUser?.portfolio &&
      bio === currentUser?.bio &&
      !picture
    ) {
      onClose();
      return;
    }

    const data = new FormData();
    data.append("bio", bio);
    data.append("fullName", fullName);
    data.append("portfolio", portfolio);
    data.append("avatar", avatar);
    data.append("picture", picture);
    data.append("username", username);

    dispatch(editUserProfile({ data }));
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setUpdateProfile(initialEditData);
    }
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
                <Avatar size={"lg"} src={avatar || selectedPicture} />
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
                      {(avatar || selectedPicture) && (
                        <Button
                          w="100%"
                          justifyContent={"flex-start"}
                          color={"red.500"}
                          gap={2}
                          onClick={() =>
                            setUpdateProfile({
                              ...updateProfile,
                              avatar: "",
                              picture: "",
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
                <FormLabel sx={editFormLabel}>Username</FormLabel>
                <Input
                  name="username"
                  placeholder="Username"
                  value={username}
                  sx={editFormInput}
                  maxLength={20}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel sx={editFormLabel}>Full Name</FormLabel>
                <Input
                  name="fullName"
                  placeholder="Full Name"
                  value={fullName}
                  sx={editFormInput}
                  maxLength={20}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl pos={"relative"}>
                <FormLabel sx={editFormLabel}>Bio</FormLabel>
                <Input
                  name="bio"
                  placeholder="Bio..."
                  sx={editFormInput}
                  onChange={handleChange}
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
                  name="portfolio"
                  placeholder="Add link"
                  value={portfolio}
                  sx={editFormInput}
                  maxLength={50}
                  onChange={handleChange}
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
