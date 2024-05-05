import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";
import App from "./App";
import theme from "./styles/Theme";
import {
  UserContext,
  UserProvider,
  PostContext,
  PostProvider,
} from "./contexts";
import { Provider } from "react-redux";
import store from "./store/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <PostProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </PostProvider>
        </ChakraProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);

export { PostContext, UserContext };
