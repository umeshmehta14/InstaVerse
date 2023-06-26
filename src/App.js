import "./App.css";
import {
  Box,
  Flex,
  VStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { Toaster } from "react-hot-toast";

import { useAuth, usePost } from "./contexts";
import { NavBar, PrivateRoute, RotatingLoader } from "./components";
import { PostFeed, Login, Profile, SignUp, SinglePost, Error } from "./pages";

function App() {
  const color = useColorModeValue("black.900", "white.900");
  const bg = useColorModeValue("white.500", "black.700");
  const { colorMode } = useColorMode();
  const { loading } = usePost();
  const { progress } = useAuth();

  return (
    <Box color={color} bg={bg} className="App">
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          style:
            colorMode === "dark"
              ? {
                  backgroundColor: "#000",
                  color: "#fff",
                }
              : { backgroundColor: "#fff", color: "#000" },
        }}
      />
      {loading ? (
        <VStack h="100vh" w="100vw" justify={"center"}>
          <RotatingLoader w="50" sw="6" />
        </VStack>
      ) : (
        <Flex flexDir={{ base: "column", md: "row" }}>
          <NavBar />
          <LoadingBar height={2} color="yellow" progress={progress} />
          <Routes>
            <Route
              path={"/"}
              element={
                <PrivateRoute>
                  <PostFeed />
                </PrivateRoute>
              }
            />
            <Route
              path={"/explore"}
              element={
                <PrivateRoute>
                  <PostFeed />
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

            <Route path={"/*"} element={<Error />} />

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
