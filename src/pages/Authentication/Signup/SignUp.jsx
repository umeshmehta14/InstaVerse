import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import {
  authBox,
  mainAuthContainer,
} from "../../../styles/AuthenticationStyles.jsx";
import { SignupForm } from "./Signup components/SignupForm.jsx";
import { sendOtpToEmail } from "../authenticationSlice.js";
import "../auth.css";

export const SignUp = () => {
  document.title = "InstaVerse | SignUp";
  const { token, formValidation } = useSelector(
    (state) => state.authentication
  );
  const navigate = useNavigate();
  const [showNextPage, setShowNextPage] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!isButtonDisabled) {
      setClick(true);
      if (!formValidation.errorText) {
        dispatch(sendOtpToEmail(email));
        setShowNextPage(true);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  //   dispatch(signupHandler({ fullName, email, username: username.trim(), password }));
  //   dispatch(
  //     updateSignupForm({
  //       fullName: "",
  //       email: "",
  //       username: "",
  //       password: "",
  //     })
  //   );
  return (
    <Flex {...mainAuthContainer}>
      {!showNextPage ? (
        <SignupForm
          handleSignup={handleSignup}
          isButtonDisabled={isButtonDisabled}
          setIsButtonDisabled={setIsButtonDisabled}
          click={click}
          setClick={setClick}
        />
      ) : (
        <Box>hello</Box>
      )}
      <Text textAlign="center" {...authBox} padding={"1rem 2rem"}>
        Already have an account?
        <Link color="blue.500" onClick={() => navigate("/login")}>
          Log In
        </Link>
      </Text>
    </Flex>
  );
};
