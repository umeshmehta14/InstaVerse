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
  authSmallText,
  loginBottomBox,
  loginConfirmCodebtn,
  loginLogosStyle,
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

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        otpDetails.otpSent ? handleVerifyOtp() : handleOtp();
      }
    },
    [handleVerifyOtp, handleOtp]
  );

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
        <Box as={VscLock} {...loginLogosStyle} />
        <Text textAlign={"center"} my={"5"} fontWeight={"700"}>
          Trouble logging in?
        </Text>
        <Text {...authSmallText}>
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
            onKeyDown={handleKeyPress}
          />
        </FormControl>

        {otpDetails.otpSent && identifier && (
          <Input
            type="text"
            maxLength={"4"}
            my={"4"}
            placeholder="Confirmation Code"
            value={confirmationCode}
            onChange={(e) => dispatch(updateConfirmationCode(e.target.value))}
            onKeyDown={handleKeyPress}
          />
        )}
        <Button
          {...loginConfirmCodebtn}
          bg={buttonDisable ? "gray" : "blue.500"}
          cursor={buttonDisable ? "default" : "pointer"}
          type="submit"
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
        {...loginBottomBox}
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
