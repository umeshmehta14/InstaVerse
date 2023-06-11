import "./App.css";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

import NavBar from "./components/Navbar/NavBar";
import { usePost } from "./contexts";
import { Route, Routes } from "react-router-dom";
import { BookMark, Explore, Home } from "./pages";

function App() {
  const color = useColorModeValue("black.900", "white.900");
  const bg = useColorModeValue("white.500", "black.700");
  const { loading } = usePost();

  return (
    <Box
      color={color}
      bg={bg}
      className="App"
    >
      {loading ? (
        "Loading.."
      ) : (
        <Flex>
          <NavBar />
          <Box
            position={"relative"}
            top={{ base: "5rem", md: "0" }}
            bottom={{ base: "5rem", md: "0" }}
            left={{ base: "0", md: "5rem", lg: "14rem" }}
          >
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/bookmark"} element={<BookMark />} />
              <Route path={"/explore"} element={<Explore />} />
            </Routes>
          </Box>
        </Flex>
      )}
    </Box>
  );
}

export default App;
