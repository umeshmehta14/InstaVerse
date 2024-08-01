import { HStack } from "@chakra-ui/react";
import React from "react";
import { TailSpin } from "react-loader-spinner";

const TailSpinLoader = () => {
  return (
    <HStack minH={"560px"} justifyContent={"center"}>
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="grey"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </HStack>
  );
};

export default TailSpinLoader;
