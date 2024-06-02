import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import {
  authBox,
  mainAuthContainer,
} from "../../../styles/AuthenticationStyles";
import { VscLock } from "../../../utils/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  sendOtpToEmail,
  updateButtonDisable,
  updateConfirmationCode,
  updateLoginForm,
  verifyUserOtp,
} from "../authenticationSlice";
import { useNavigate } from "react-router-dom";
import { RotatingLoader } from "../../../components";

export const LoginConfirmation = () => {
  const { colorMode } = useColorMode();

  const { loginForm, btnLoader, buttonDisable, otpDetails, confirmationCode } =
    useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { identifier } = loginForm;

  const handleOtp = useCallback(() => {
    if (!buttonDisable) {
      dispatch(sendOtpToEmail({ login: true, identifier }));
    }
  }, [buttonDisable, dispatch, identifier]);

  const handleVerifyOtp = useCallback(() => {
    if (!buttonDisable) {
      dispatch(
        verifyUserOtp({ identifier, login: true, otp: confirmationCode })
      );
    }
  }, [buttonDisable, dispatch, identifier, confirmationCode]);

  useEffect(() => {
    if (otpDetails.otpSent) {
      dispatch(
        updateButtonDisable(!confirmationCode || confirmationCode.length !== 4)
      );
    } else {
      dispatch(updateButtonDisable(!identifier));
    }
  }, [dispatch, otpDetails.otpSent, identifier, confirmationCode]);

  useEffect(() => {
    if (otpDetails.verified) {
      navigate("/accounts/password/reset/confirm/");
    }
  }, [otpDetails.verified, navigate]);

  return (
    <Flex {...mainAuthContainer} gap={0}>
      <Box
        {...authBox}
        bg={colorMode === "light" ? "white.500" : "black.900"}
        pb={0}
      >
        <Box
          as={VscLock}
          color={"gray"}
          m={"auto"}
          my={"4"}
          fontSize={"8rem"}
          textAlign={"center"}
        />
        <Text textAlign={"center"} my={"5"} fontWeight={"700"}>
          Trouble logging in?
        </Text>
        <Text
          textAlign={"center"}
          mb={"5"}
          color={"gray"}
          fontSize={"0.9rem"}
          fontWeight={"400"}
        >
          Enter your email or username and we'll send you a code to get back
          into your account.
        </Text>

        <FormControl
          id="fullname"
          mb={4}
          className={`floating-label-input ${identifier ? "filled" : ""}`}
        >
          <FormLabel className="floating-label">Username or Email</FormLabel>
          <Input
            type="text"
            value={identifier}
            onChange={(event) => {
              dispatch(
                updateLoginForm({
                  ...loginForm,
                  identifier: event.target.value,
                })
              );
              dispatch(updateConfirmationCode(""));
            }}
            disabled={otpDetails.otpSent && identifier}
          />
        </FormControl>

        {otpDetails.otpSent && identifier && (
          <Input
            type="text"
            maxLength={"4"}
            value={confirmationCode}
            onChange={(e) => dispatch(updateConfirmationCode(e.target.value))}
            placeholder="Confirmation Code"
            my={"4"}
          />
        )}
        <Button
          bg={buttonDisable ? "gray" : "blue.500"}
          cursor={buttonDisable ? "default" : "pointer"}
          type="submit"
          w={"100%"}
          color={"white"}
          borderRadius={"12px"}
          mb={"4rem"}
          disabled={buttonDisable}
          onClick={() => (otpDetails.otpSent ? handleVerifyOtp() : handleOtp())}
        >
          {btnLoader ? (
            <RotatingLoader w="20" sw={"7"} />
          ) : otpDetails.otpSent ? (
            "Confirm"
          ) : (
            "Send Code"
          )}
        </Button>
      </Box>
      <Text
        {...authBox}
        color={"blue.500"}
        fontWeight={"bold"}
        textAlign={"center"}
        cursor={"pointer"}
        _hover={{ color: "gray" }}
        padding={"1rem"}
        borderRadius={0}
        onClick={() => {
          dispatch(updateConfirmationCode(""));
          dispatch(
            updateLoginForm({
              identifier: "",
              password: "",
            })
          );
          navigate("/login");
        }}
      >
        Back to login
      </Text>
    </Flex>
  );
};
