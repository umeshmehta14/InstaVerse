import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import theme from "./styles/Theme";
import {
  AuthProvider,
  AuthContext,
  UserContext,
  UserProvider,
  PostContext,
  PostProvider,
} from "./contexts";

makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <PostProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </PostProvider>
        </AuthProvider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>
);

export { AuthContext, PostContext, UserContext };
