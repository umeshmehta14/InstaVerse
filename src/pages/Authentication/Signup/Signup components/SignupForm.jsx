import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Text,
  useColorMode,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import {
  validateFromDetails,
  updateShowPassword,
  updateSignupForm,
  updateButtonDisable,
} from "../../authenticationSlice.js";
import {
  IoCheckmarkCircleOutline,
  RxCrossCircled,
} from "../../../../utils/Icons.jsx";
import { authBox } from "../../../../styles/AuthenticationStyles.jsx";

export const SignupForm = ({ handleSignup, click, setClick }) => {
  const { colorMode } = useColorMode();
  const { signupForm, showPassword, formValidation, buttonDisable } =
    useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const { fullName, email, username, password } = signupForm;

  const [focusedField, setFocusedField] = useState(null);

  const handleBlur = useCallback(() => {
    setClick(false);
    dispatch(
      validateFromDetails({ username: username.trim(), email, password })
    );
    setFocusedField(null);
  }, [dispatch, username, email, password, setClick]);

  const handleFocus = useCallback(
    (field) => {
      setClick(false);
      setFocusedField(field);
    },
    [setClick]
  );

  useEffect(() => {
    if (password.length >= 8 && email && username) {
      dispatch(updateButtonDisable(false));
    } else {
      dispatch(updateButtonDisable(true));
    }
  }, [email, username, password, dispatch]);

  return (
    <Box {...authBox} bg={colorMode === "light" ? "white.500" : "black.900"}>
      <Heading
        fontFamily={"Pacifico, cursive"}
        title="InstaVerse"
        align={"center"}
        color={colorMode === "light" ? "#262626" : "gray"}
        my={"4"}
      >
        InstaVerse
      </Heading>
      <Text
        textAlign={"center"}
        margin={"1rem 0"}
        padding={"0 1rem"}
        color={"gray"}
      >
        Sign up to see photos and videos from your friends.
      </Text>
      <Divider mb={"1rem"} />
      <form onSubmit={handleSignup}>
        <FormControl
          id="email"
          mb={4}
          className={`floating-label-input ${email ? "filled" : ""}`}
        >
          <FormLabel className="floating-label">Email</FormLabel>
          <InputGroup>
            <Input
              type="text"
              value={email}
              onChange={(event) =>
                dispatch(
                  updateSignupForm({
                    ...signupForm,
                    email: event.target.value,
                  })
                )
              }
              onBlur={handleBlur}
              onFocus={() => handleFocus("email")}
              className="floating-input"
            />
            <InputRightElement
              children={
                email && focusedField !== "email" ? (
                  formValidation.email ? (
                    <IoCheckmarkCircleOutline color="gray" />
                  ) : (
                    <RxCrossCircled color="#ef3343" />
                  )
                ) : null
              }
              fontSize={"2rem"}
            />
          </InputGroup>
        </FormControl>

        <FormControl
          id="fullname"
          mb={4}
          className={`floating-label-input ${fullName ? "filled" : ""}`}
        >
          <FormLabel className="floating-label">Full Name</FormLabel>
          <Input
            type="text"
            value={fullName}
            onChange={(event) =>
              dispatch(
                updateSignupForm({
                  ...signupForm,
                  fullName: event.target.value,
                })
              )
            }
            className="floating-input"
          />
        </FormControl>

        <FormControl
          id="username"
          mb={4}
          className={`floating-label-input ${username ? "filled" : ""}`}
        >
          <FormLabel className="floating-label">Username</FormLabel>
          <InputGroup>
            <Input
              type="text"
              value={username}
              onChange={(event) =>
                dispatch(
                  updateSignupForm({
                    ...signupForm,
                    username: event.target.value,
                  })
                )
              }
              onBlur={handleBlur}
              onFocus={() => handleFocus("username")}
            />
            <InputRightElement
              children={
                username && focusedField !== "username" ? (
                  formValidation.username ? (
                    <IoCheckmarkCircleOutline color="gray" />
                  ) : (
                    <RxCrossCircled color="#ef3343" />
                  )
                ) : null
              }
              fontSize={"2rem"}
            />
          </InputGroup>
        </FormControl>

        <FormControl
          id="password"
          mb={6}
          className={`floating-label-input ${password ? "filled" : ""}`}
        >
          <FormLabel className="floating-label">Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => {
                handleBlur();
                dispatch(
                  updateSignupForm({
                    ...signupForm,
                    password: event.target.value,
                  })
                );
              }}
              onBlur={handleBlur}
              className="floating-input password-inp"
            />
            <InputRightElement
              children={
                password && focusedField !== "password" ? (
                  formValidation.password ? (
                    <IoCheckmarkCircleOutline color="gray" />
                  ) : (
                    <RxCrossCircled color="#ef3343" />
                  )
                ) : null
              }
              fontSize={"2rem"}
              right={"2.7rem"}
            />
            {password && (
              <InputRightElement
                cursor={"pointer"}
                fontSize={"sm"}
                onClick={() => dispatch(updateShowPassword())}
              >
                {showPassword ? "Hide" : "Show"}
              </InputRightElement>
            )}
          </InputGroup>
        </FormControl>
        <Text
          fontSize={"12px"}
          color={"grey"}
          textAlign={"center"}
          margin={"1rem 0"}
          padding={"0 1rem"}
        >
          People who use our service may have uploaded your contact information
          to Instaverse.
        </Text>
        <VStack justifyContent={"space-between"}>
          <Button
            bg={buttonDisable ? "gray" : "blue.500"}
            cursor={buttonDisable ? "default" : "pointer"}
            type="submit"
            w={"100%"}
            color={"white"}
            borderRadius={"12px"}
            disabled={buttonDisable}
          >
            Sign Up
          </Button>
        </VStack>
      </form>
      {click && (
        <Text pt={"2rem"} color="#ef3343" textAlign={"center"}>
          {formValidation.errorText}
        </Text>
      )}
    </Box>
  );
};
