import { Box, useColorMode, Text, Input, Button } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

import { TbMailHeart } from "../../../../utils/Icons";
import {
  authBox,
  codeSentLinkStyle,
  loginLogosStyle,
  signupGoBackBtnStyle,
} from "../../../../styles/AuthenticationStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  sendOtpToEmail,
  signupHandler,
  updateButtonDisable,
  updateConfirmationCode,
  updateSignupForm,
  verifyUserOtp,
} from "../../authenticationSlice";
import toast from "react-hot-toast";
import { RotatingLoader } from "../../../../components";
import { useNavigate } from "react-router-dom";

export const SignupConfirmation = ({ setShowNextPage }) => {
  const { colorMode } = useColorMode();
  const { signupForm, otpDetails, btnLoader, buttonDisable, confirmationCode } =
    useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fullName, email, username, password } = signupForm;

  const handleVerifyOtp = () => {
    if (!buttonDisable) {
      dispatch(verifyUserOtp({ email, otp: confirmationCode }));
    }
  };

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleVerifyOtp();
      }
    },
    [handleVerifyOtp]
  );

  useEffect(() => {
    if (confirmationCode.length === 4) {
      dispatch(updateButtonDisable(false));
    } else {
      dispatch(updateButtonDisable(true));
    }
  }, [confirmationCode]);

  useEffect(() => {
    if (otpDetails.verified) {
      dispatch(
        signupHandler({
          fullName,
          email,
          username: username.trim(),
          password,
        })
      );
    }
  }, [dispatch, updateSignupForm, signupHandler, otpDetails.verified]);

  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email]);

  return (
    <Box {...authBox} bg={colorMode === "light" ? "white.500" : "black.900"}>
      <Box as={TbMailHeart} {...loginLogosStyle} />
      <Text textAlign={"center"} my={"5"} fontWeight={"700"}>
        Enter Confirmation Code
      </Text>
      <Text textAlign={"center"} mb={"5"}>
        Enter the confirmation code we sent to {email}.{" "}
        <Text
          {...codeSentLinkStyle}
          onClick={() => {
            dispatch(sendOtpToEmail({ email })).then(() =>
              toast.success(
                `We sent the confirmation code to your email ${email}.`
              )
            );
          }}
        >
          Resend Code.
        </Text>
      </Text>

      <Input
        type="text"
        maxLength={"4"}
        value={confirmationCode}
        placeholder="Confirmation Code"
        my={"4"}
        onChange={(e) => dispatch(updateConfirmationCode(e.target.value))}
        onKeyDown={handleKeyPress}
      />
      <Button
        bg={buttonDisable ? "gray" : "blue.500"}
        cursor={buttonDisable ? "default" : "pointer"}
        type="submit"
        w={"100%"}
        color={"white"}
        borderRadius={"12px"}
        disabled={buttonDisable}
        onClick={() => handleVerifyOtp()}
      >
        {btnLoader ? <RotatingLoader w="20" sw={"7"} /> : "Confirm"}
      </Button>

      <Text
        {...signupGoBackBtnStyle}
        onClick={() => {
          dispatch(
            updateSignupForm({
              ...signupForm,
              password: "",
            })
          );
          setShowNextPage(false);
        }}
      >
        Go back
      </Text>

      <Text pt={"2rem"} color="#ef3343" textAlign={"center"}>
        {otpDetails.errorMessage}
      </Text>
    </Box>
  );
};
