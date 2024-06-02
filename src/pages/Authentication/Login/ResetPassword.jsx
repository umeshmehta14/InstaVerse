import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  authBox,
  mainAuthContainer,
} from "../../../styles/AuthenticationStyles";
import { RotatingLoader } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUserPassword,
  updateButtonDisable,
  updateLoginForm,
} from "../authenticationSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const ResetPassword = () => {
  const { colorMode } = useColorMode();

  const { buttonDisable, btnLoader, otpDetails, loginForm, passwordReset } =
    useSelector((state) => state.authentication);
  const [passwords, setPasswords] = useState({
    password1: "",
    password2: "",
  });
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const { password1, password2 } = passwords;

  const dispatch = useDispatch();

  const handlePasswordReset = () => {
    setClick(true);
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
    if (
      password1.length >= 8 &&
      password2.length >= 8 &&
      password1 === password2
    ) {
      dispatch(updateButtonDisable(false));
    } else {
      dispatch(updateButtonDisable(true));
    }
  }, [passwords]);

  useEffect(() => {
    if (!loginForm.identifier) {
      navigate("/accounts/password/emailConfirmation/");
    }

    if (passwordReset) {
      dispatch(
        updateLoginForm({
          identifier: "",
          password: "",
        })
      );
      navigate("/login");
    }
  }, [loginForm.identifier, passwordReset]);

  return (
    <Flex {...mainAuthContainer}>
      <Box {...authBox} bg={colorMode === "light" ? "white.500" : "black.900"}>
        <Text textAlign={"center"} my={"5"} fontWeight={"bold"}>
          Create a strong password
        </Text>
        <Text
          textAlign={"center"}
          mb={"5"}
          color={"gray"}
          fontSize={"0.9rem"}
          fontWeight={"400"}
        >
          Your password must be at least six characters and should include a
          combination of numbers, letters and special characters (!$@％).
        </Text>

        <FormLabel color={"gray"} fontSize={"0.7rem"} m={"0 0.4rem"} h={"17px"}>
          {password1 &&
            password1?.length < 8 &&
            "Passwords must be at least eight characters long."}
        </FormLabel>

        <Input
          type="password"
          value={password1}
          onChange={(e) =>
            setPasswords({ ...passwords, password1: e.target.value })
          }
          placeholder="New password"
          mb={"4"}
        />

        <FormLabel color={"gray"} fontSize={"0.7rem"} m={"0 0.4rem"} h={"17px"}>
          {password2 && password2 !== password1 && "Passwords don't match."}
        </FormLabel>

        <Input
          type="password"
          value={password2}
          onChange={(e) =>
            setPasswords({ ...passwords, password2: e.target.value })
          }
          placeholder="New password, again"
          mb={"4"}
        />
        <Button
          bg={buttonDisable ? "gray" : "blue.500"}
          cursor={buttonDisable ? "default" : "pointer"}
          type="submit"
          w={"100%"}
          color={"white"}
          borderRadius={"12px"}
          mt={"2rem"}
          disabled={buttonDisable}
          onClick={() => handlePasswordReset()}
        >
          {btnLoader ? <RotatingLoader w="20" sw={"7"} /> : "Reset Password"}
        </Button>
        {click && otpDetails.errorMessage && (
          <Text pt={"2rem"} color="#ef3343" textAlign={"center"}>
            {otpDetails.errorMessage}
          </Text>
        )}
      </Box>
    </Flex>
  );
};
