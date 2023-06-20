import "./App.css";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import { useAuth, usePost } from "./contexts";
import { NavBar, PrivateRoute } from "./components";
import { Explore, Home, Login, Profile, SignUp, SinglePost } from "./pages";
import LoadingBar from "react-top-loading-bar";
import { Toaster } from "react-hot-toast";

function App() {
  const color = useColorModeValue("black.900", "white.900");
  const bg = useColorModeValue("white.500", "black.700");
  const { loading } = usePost();
  const { progress } = useAuth();

  return (
    <Box color={color} bg={bg} className="App">
      <Toaster position="top-center" reverseOrder={true} />
      {loading ? (
        "Loading.."
      ) : (
        <Flex flexDir={{ base: "column", md: "row" }}>
          <NavBar />
          <LoadingBar height={2} color="yellow" progress={progress} />
          <Routes>
            <Route
              path={"/"}
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path={"/explore"}
              element={
                <PrivateRoute>
                  <Explore />
                </PrivateRoute>
              }
            />

            <Route
              path={"/post/:postId"}
              element={
                <PrivateRoute>
                  <SinglePost />
                </PrivateRoute>
              }
            />
            <Route
              path={"/profile/:username"}
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route path={"/error"} element={<Login />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} element={<SignUp />} />
          </Routes>
        </Flex>
      )}
    </Box>
  );
}

export default App;
