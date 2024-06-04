import React from "react";
import { RotatingLines } from "react-loader-spinner";

export const RotatingLoader = ({ w, sw }) => {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth={sw}
      animationDuration="0.75"
      width={w}
      visible={true}
    />
  );
};
