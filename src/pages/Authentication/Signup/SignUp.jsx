import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import {
  authBox,
  mainAuthContainer,
} from "../../../styles/AuthenticationStyles.jsx";
import { SignupForm } from "./Signup components/SignupForm.jsx";
import { sendOtpToEmail, updateSignupForm } from "../authenticationSlice.js";
import "../auth.css";
import { SignupConfirmation } from "./Signup components/SignupConfirmation.jsx";

export const SignUp = () => {
  document.title = "InstaVerse | SignUp";
  const {
    token,
    formValidation,
    signupForm: { email },
  } = useSelector((state) => state.authentication);
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
        <SignupConfirmation setShowNextPage={setShowNextPage} />
      )}
      <Text textAlign="center" {...authBox} padding={"1rem 2rem"}>
        Have an account?{" "}
        <Link
          color="blue.500"
          onClick={() => {
            dispatch(
              updateSignupForm({
                fullName: "",
                email: "",
                username: "",
                password: "",
              })
            );
            navigate("/login");
          }}
        >
          Log In
        </Link>
      </Text>
    </Flex>
  );
};
