import "./App.css";
import { Box, Flex, VStack, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import { useAuth, usePost } from "./contexts";
import { NavBar, PrivateRoute, RotatingLoader } from "./components";
import { PostFeed, Login, Profile, SignUp, SinglePost } from "./pages";
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
