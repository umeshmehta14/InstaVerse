import React, { useState } from "react";
import {
  Flex,
  Text,
  HStack,
  useColorMode,
  Button,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";

import {
  MdHome,
  MdOutlineExplore,
  AiOutlineHeart,
  TbSquareRoundedPlus,
  MdSearch,
  BsFillSunFill,
  FaInstalod,
} from "../../utils/Icons";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBox from "./navbar components/SearchBox";

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [openSearch, setOpenSearch] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Flex
        display={{ base: "flex", md: "none" }}
        position={"fixed"}
        bg={useColorModeValue("white.900", "black.900")}
        top={"0"}
        h={"3rem"}
        align={"center"}
        px={"1rem"}
        columnGap={"0.5rem"}
        borderBottom={"1px solid gray"}
        w={"100%"}
        justifyContent={"space-between"}
      >
        <Text fontFamily={"Pacifico, cursive"} fontSize={"1.2rem"}>
          InstaVerse
        </Text>
        <HStack>
          {openSearch ? (
            <SearchBox setOpenSearch={setOpenSearch} openSearch={openSearch} />
          ) : (
            <Button
              variant={"link-button"}
              fontSize={"2rem"}
              color={colorMode === "light" ? "black" : "blue.900"}
              onClick={() => setOpenSearch(!openSearch)}
              title="Search"
            >
              <MdSearch />
            </Button>
          )}
          <Button
            variant={"link-button"}
            fontSize={"1.6rem"}
            color={colorMode === "light" ? "black" : "blue.900"}
            onClick={toggleColorMode}
          >
            <BsFillSunFill />
          </Button>
        </HStack>
      </Flex>

      <Flex
        position={"fixed"}
        bottom={0}
        flexDirection={{ base: "row", md: "column" }}
        w={{ base: "100%", md: "4rem", lg: "14rem" }}
        top={{ base: "auto", md: "0" }}
        py={"0.5rem"}
        pl={"1rem"}
        borderTop={{base:"1px solid gray", md:"none"}}
        borderRight={{base:"none", md:"1px solid gray"}}
        justifyContent={"space-between"}
        bg={useColorModeValue("white.900", "black.900")}
      >
        <Flex
          flexDirection={{ base: "row", md: "column" }}
          h={{base:"auto",md:"70%"}}
          w={{base:"100%", lg:"90%"}}
          mx={"auto"}
          maxH={"520px"}
          justifyContent={{base:"space-between", lg:"flex-start"}}
        >
          <HStack
            cursor={"pointer"}
            justifyContent={{base:"center",lg:"flex-start"}}
            align={"center"}
            w={"100%"}
            py={"2rem"}
            fontSize={"2rem"}
            display={{ base: "none",md:"flex"}}
          >
            <Text display={{ base: "none",md:"flex", lg: "none" }}>
              <FaInstalod />
            </Text>

            <Text  fontFamily={"Pacifico, cursive"} fontSize={"1.5rem"} display={{ base: "none", lg: "flex" }} onClick={()=> navigate("/")}>
          InstaVerse
        </Text>
          </HStack>
          <Flex
            gap={"1.5rem"}
            fontSize={"2rem"}
            flexDir={{ base: "row", md: "column" }}
            align={"center"}
            w={{base:"100%", md:"auto"}}
            p={{base:"1rem", md:"2rem", lg:"0rem"}}
            py={{lg:"2rem"}}
            alignItems={{base:"center", lg:"baseline"}}
            justifyContent={{base:"space-between", md:"center"}}
          >
            <NavLink to="/">
              <HStack columnGap={"0.8rem"}>
                <MdHome />
                <Text
                  display={{ base: "none", lg: "inline-block" }}
                  fontSize={"1rem"}
                >
                  Home
                </Text>
              </HStack>
            </NavLink>

            <NavLink to="/" id="md-search-nav">
              <HStack columnGap={"0.8rem"}>
                <MdSearch />
                <Text
                  display={{ base: "none", lg: "inline-block" }}
                  fontSize={"1rem"}
                >
                  Search
                </Text>
              </HStack>
            </NavLink>

            <NavLink to="/explore">
              <HStack columnGap={"0.8rem"}>
                <MdOutlineExplore />
                <Text
                  display={{ base: "none", lg: "inline-block" }}
                  fontSize={"1rem"}
                >
                  Explore
                </Text>
              </HStack>
            </NavLink>

            <NavLink to="/explore">
              <HStack columnGap={"0.8rem"}>
                <TbSquareRoundedPlus />
                <Text
                  display={{ base: "none", lg: "inline-block" }}
                  fontSize={"1rem"}
                >
                  Create
                </Text>
              </HStack>
            </NavLink>

            <NavLink to="/likeposts">
              <HStack columnGap={"0.8rem"}>
                <AiOutlineHeart />
                <Text
                  display={{ base: "none", lg: "inline-block" }}
                  fontSize={"1rem"}
                >
                  Likes
                </Text>
              </HStack>
            </NavLink>

            <NavLink to="/">
            <HStack columnGap={"0.8rem"}>
                <Avatar
                  size={"sm"}
                  name="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                />
                <Text
                  display={{ base: "none", lg: "inline-block" }}
                  fontSize={"1rem"}
                >
                  Profile
                </Text>
              </HStack>
            </NavLink>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
