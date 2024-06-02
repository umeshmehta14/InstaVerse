import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLoader } from "../../../components";
import {
  authBox,
  mainAuthContainer,
} from "../../../styles/AuthenticationStyles";
import {
  resetUserPassword,
  updateButtonDisable,
  updateLoginForm,
} from "../authenticationSlice";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { buttonDisable, btnLoader, otpDetails, loginForm, passwordReset } =
    useSelector((state) => state.authentication);

  const [passwords, setPasswords] = useState({ password1: "", password2: "" });

  const { password1, password2 } = passwords;

  const handlePasswordReset = () => {
    if (!buttonDisable) {
      dispatch(
        resetUserPassword({
          identifier: loginForm.identifier,
          password: password2,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      updateButtonDisable(
        password1.length < 8 || password2.length < 8 || password1 !== password2
      )
    );
  }, [dispatch, password1, password2]);

  useEffect(() => {
    if (!loginForm.identifier) {
      navigate("/accounts/password/emailConfirmation/");
    }

    if (passwordReset) {
      dispatch(updateLoginForm({ identifier: "", password: "" }));
      navigate("/login");
    }
  }, [loginForm.identifier, passwordReset, navigate, dispatch]);

  return (
    <Flex {...mainAuthContainer}>
      <Box {...authBox} bg={colorMode === "light" ? "white.500" : "black.900"}>
        <Text textAlign="center" my="5" fontWeight="bold">
          Create a strong password
        </Text>
        <Text
          color="gray"
          fontSize="0.9rem"
          fontWeight="400"
          textAlign="center"
        >
          Your password must be at least eight characters and should include a
          combination of numbers, letters, and special characters (!$@％).
        </Text>

        <FormLabel color="gray" fontSize="0.7rem" m="0 0.4rem" height="17px">
          {password1.length > 0 &&
            password1.length < 8 &&
            "Passwords must be at least eight characters long."}
        </FormLabel>

        <Input
          type="password"
          value={password1}
          onChange={(e) =>
            setPasswords({ ...passwords, password1: e.target.value })
          }
          placeholder="New password"
          mb="4"
        />

        <FormLabel color="gray" fontSize="0.7rem" m="0 0.4rem" height="17px">
          {password2.length > 0 &&
            password2 !== password1 &&
            "Passwords don't match."}
        </FormLabel>

        <Input
          type="password"
          value={password2}
          onChange={(e) =>
            setPasswords({ ...passwords, password2: e.target.value })
          }
          placeholder="New password, again"
          mb="4"
        />

        <Button
          bg={buttonDisable ? "gray" : "blue.500"}
          cursor={buttonDisable ? "default" : "pointer"}
          type="submit"
          width="100%"
          color="white"
          borderRadius="12px"
          mt="2rem"
          disabled={buttonDisable}
          onClick={handlePasswordReset}
        >
          {btnLoader ? <RotatingLoader w="20" sw="7" /> : "Reset Password"}
        </Button>

        {otpDetails.errorMessage && (
          <Text pt="2rem" color="#ef3343" textAlign="center">
            {otpDetails.errorMessage}
          </Text>
        )}
      </Box>
    </Flex>
  );
};
