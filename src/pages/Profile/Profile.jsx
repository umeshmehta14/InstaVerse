import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, Divider, useDisclosure } from "@chakra-ui/react";

import { ProfileSkeleton, ProfileDetail } from "../index";
import { PostModal } from "../../components";
import { profileMainBox } from "../../styles/ProfileStyles";

import { useDispatch, useSelector } from "react-redux";
import { getUserByUsername } from "../Post Feed/userSlice";
import UserProfileTabs from "./Profile Components/UserProfileTabs";

export const Profile = () => {
  const paramUser = useParams();

  const postModalDisclosure = useDisclosure();

  const [prevUsername, setPrevUsername] = useState("");

  const { currentUser, progress } = useSelector(
    (state) => state.authentication
  );
  const { selectedUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  document.title = `@${selectedUser?.username || "Instaverse | Profile"}`;
  const currentUserCheck = currentUser.username === selectedUser?.username;

  useEffect(() => {
    if (paramUser.username !== prevUsername) {
      dispatch(getUserByUsername({ username: paramUser?.username }));
      setPrevUsername(paramUser.username);
    }
  }, [paramUser.username, prevUsername, dispatch]);

  return progress === 100 ? (
    <Flex {...profileMainBox}>
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
