import {
  Avatar,
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { handleFollowUnfollowUser } from "../../pages/Post Feed/userSlice";
import { simpleButton } from "../../styles/GlobalStyles";

export const UnfollowModal = ({
  isOpen,
  onClose,
  _id,
  username,
  avatar,
  notSelectedUser,
  fromLiked,
  singlePost,
  infoPopupOnclose,
}) => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();

  const handleUnfollow = () => {
    const actionPayload = {
      _id,
      follow: false,
      username,
      notSelectedUser,
      noPostLoading: true,
    };

    if (fromLiked) {
      dispatch(handleFollowUnfollowUser(actionPayload));
    } else if (singlePost) {
      dispatch(handleFollowUnfollowUser({ ...actionPayload, singlePost }));
    } else {
      dispatch(handleFollowUnfollowUser({ ...actionPayload, unFollow: true }));
    }

    infoPopupOnclose ? infoPopupOnclose() : null;
    onClose();
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={colorMode === "dark" ? "black.600" : "white.500"}
        mt={"15rem"}
        maxWidth={"390px"}
      >
        <VStack pt={"1.5rem"} pb={"0.5rem"}>
          <Avatar size={"xl"} src={avatar?.url} />
          <Text m="0.5rem">unfollow @{username}?</Text>
          <Divider />
          <Button sx={simpleButton} color={"red"} onClick={handleUnfollow}>
            Unfollow
          </Button>
          <Divider />
          <Button sx={simpleButton} onClick={onClose}>
            Close
          </Button>
        </VStack>
      </ModalContent>
    </Modal>
  );
};
