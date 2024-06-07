import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Divider, useDisclosure } from "@chakra-ui/react";

import { ProfileDetail } from "../index";
import { PostModal, ProfileSkeleton } from "../../components";
import { profileMainBox } from "../../styles/ProfileStyles";

import { useDispatch, useSelector } from "react-redux";
import { getUserByUsername } from "../Post Feed/userSlice";
import UserProfileTabs from "./Profile Components/UserProfileTabs";
import { hideScrollbar } from "../../styles/GlobalStyles";

export const Profile = () => {
  const paramUser = useParams();
  const navigate = useNavigate();

  const postModalDisclosure = useDisclosure();

  const [prevUsername, setPrevUsername] = useState("");

  const { currentUser, progress } = useSelector(
    (state) => state.authentication
  );
  const { selectedUser, isSelectedUserFetched } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  document.title = `@${selectedUser?.username || "Instaverse | Profile"}`;
  const currentUserCheck = currentUser.username === selectedUser?.username;

  useEffect(() => {
    if (paramUser.username !== prevUsername) {
      dispatch(getUserByUsername({ username: paramUser?.username }));
      setPrevUsername(paramUser.username);
    }
  }, [paramUser.username, prevUsername, dispatch]);

  useEffect(() => {
    console.log({ progress, l: !selectedUser?.username, selectedUser });
    if (isSelectedUserFetched && progress === 100 && !selectedUser?.username) {
      navigate(`/${paramUser.username}`);
    }
  }, [selectedUser?.username, isSelectedUserFetched, progress]);

  return progress === 100 ? (
    <Flex {...profileMainBox} sx={hideScrollbar}>
      <ProfileDetail
        selectedUser={selectedUser}
        currentUserCheck={currentUserCheck}
      />
      <Divider />
      <UserProfileTabs
        currentUserCheck={currentUserCheck}
        postModalDisclosure={postModalDisclosure}
      />
      {postModalDisclosure.isOpen && (
        <PostModal
          isOpen={postModalDisclosure.isOpen}
          onClose={postModalDisclosure.onClose}
        />
      )}
    </Flex>
  ) : (
    <ProfileSkeleton />
  );
};
