import React from "react";
import { RotatingLines } from "react-loader-spinner";

export const RotatingLoader = () => {
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
