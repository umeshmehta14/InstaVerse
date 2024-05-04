import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.authentication);

  console.log("token", token);
  const location = useLocation();

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
};
