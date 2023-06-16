import React from "react";
import { RotatingLines } from "react-loader-spinner";

const RotatingLoader = () => {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="7"
      animationDuration="0.75"
      width="20"
      visible={true}
    />
  );
};

export default RotatingLoader;
