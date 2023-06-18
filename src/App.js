import "./App.css";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import { useAuth, usePost } from "./contexts";
import { NavBar, PrivateRoute } from "./components";
import { BookMark, Explore, Home, Login, Profile, SignUp } from "./pages";
import LoadingBar from "react-top-loading-bar";

function App() {
  const color = useColorModeValue("black.900", "white.900");
  const bg = useColorModeValue("white.500", "black.700");
  const { loading } = usePost();
  const { progress } = useAuth();

  return (
    <Box color={color} bg={bg} className="App">
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
              path={"/bookmark"}
              element={
                <PrivateRoute>
                  <BookMark />
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
              path={"/profile/:username"}
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route path={"/*"} element={<Login />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} element={<SignUp />} />
          </Routes>
        </Flex>
      )}
    </Box>
  );
}

export default App;
