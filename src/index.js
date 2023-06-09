import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "./index.css";
import { makeServer } from "./server";
import { AuthProvider, AuthContext } from "./contexts";

makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
      <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);


export {AuthContext};