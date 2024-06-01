import { Box, useColorMode, Text, Input, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { TbMailHeart } from "../../../../utils/Icons";
import { authBox } from "../../../../styles/AuthenticationStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  sendOtpToEmail,
  signupHandler,
  updateSignupForm,
  verifyUserOtp,
} from "../../authenticationSlice";
import toast from "react-hot-toast";
import { RotatingLoader } from "../../../../components";

export const SignupConfirmation = ({ setShowNextPage }) => {
  const colorMode = useColorMode();
  const { signupForm, otpDetails, btnLoader } = useSelector(
    (state) => state.authentication
  );
  const dispatch = useDispatch();
  const { fullName, email, username, password } = signupForm;

  const [buttonDisable, SetButtonDisable] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleVerifyOtp = () => {
    if (!buttonDisable) {
      dispatch(verifyUserOtp({ email, otp: confirmationCode }));
    }
  };

  console.log("otp details message", otpDetails.errorMessage);

  useEffect(() => {
    if (confirmationCode.length === 4) {
      SetButtonDisable(false);
    } else {
      SetButtonDisable(true);
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
      dispatch(
        updateSignupForm({
          fullName: "",
          email: "",
          username: "",
          password: "",
        })
      );
    }
  }, [dispatch, updateSignupForm, signupHandler, otpDetails.verified]);

  return (
    <Box {...authBox} bg={colorMode === "light" ? "white.500" : "black.900"}>
      <Box
        as={TbMailHeart}
        color={"gray"}
        m={"auto"}
        my={"4"}
        fontSize={"8rem"}
        textAlign={"center"}
      />
      <Text textAlign={"center"} my={"5"} fontWeight={"700"}>
        Enter Confirmation Code
      </Text>
      <Text textAlign={"center"} mb={"5"}>
        Enter the confirmation code we sent to {email}.{" "}
        <Text
          display={"inline"}
          cursor={"pointer"}
          _hover={{ color: "gray" }}
          color={"blue.500"}
          fontWeight={"bold"}
          onClick={() => {
            toast.success(
              `We sent the confirmation code to your email ${email}.`
            );
            dispatch(sendOtpToEmail(email));
          }}
        >
          Resend Code.
        </Text>
      </Text>

      <Input
        type="text"
        maxLength={"4"}
        value={confirmationCode}
        onChange={(e) => setConfirmationCode(e.target.value)}
        placeholder="Confirmation Code"
        my={"4"}
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
        color={"blue.500"}
        fontWeight={"bold"}
        textAlign={"center"}
        my={"4"}
        cursor={"pointer"}
        _hover={{ color: "gray" }}
        onClick={() => setShowNextPage(false)}
      >
        Go back
      </Text>

      <Text pt={"2rem"} color="#ef3343" textAlign={"center"}>
        {otpDetails.errorMessage}
      </Text>
    </Box>
  );
};
