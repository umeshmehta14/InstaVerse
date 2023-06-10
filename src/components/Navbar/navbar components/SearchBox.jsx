import { Box, Button, Input, useColorMode } from "@chakra-ui/react";
import React from "react";

import { RxCross2 } from "../../../utils/Icons";

const SearchBox = ({ setOpenSearch, openSearch }) => {
  const { colorMode } = useColorMode();

  return (
    <Box position={"relative"}>
      <Input
        placeholder="Search User"
        _placeholder={{ opacity: 1, color: "gray.500" }}
        pr={"2rem"}
        bg={colorMode === "dark" ? "black.700" : "white.500"}
        height={"2rem"}
      />
      <Button
        variant={"link-button"}
        position={"absolute"}
        top={"5px"}
        right={"-0.5rem"}
        fontSize={"1.5rem"}
        onClick={() => setOpenSearch(!openSearch)}
      >
        <RxCross2 />
      </Button>
    </Box>
  );
};

export default SearchBox;
