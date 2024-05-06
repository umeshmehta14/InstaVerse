import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Grid,
  GridItem,
  Image,
  AspectRatio,
  Box,
  Flex,
} from "@chakra-ui/react";

import {
  profileHoverStyle,
  profileImageStyle,
} from "../../../styles/ProfileStyles";
import { FaComment, AiFillHeart } from "../../../utils/Icons";

export const GridBox = ({ showingPost }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Grid
      templateColumns="repeat(3, minmax(104px, 1fr))"
      width={"100%"}
      gap={"1"}
    >
      {showingPost?.map((post) => {
        const { url, _id, comments, username, likes } = post;
        const [isHovered, setIsHovered] = useState(false);

        return (
          <GridItem
            key={_id}
            pos={"relative"}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
            cursor={"pointer"}
            onClick={() =>
              navigate(`/post/${_id}`, { state: { from: location } })
            }
          >
            <AspectRatio ratio={1}>
              <Image src={url} alt={username} {...profileImageStyle} />
            </AspectRatio>
            <Flex display={isHovered ? "flex" : "none"} {...profileHoverStyle}>
              <Flex align={"center"} gap={"2"}>
                <Box as={FaComment} fontSize={"1.5rem"} />
                {comments?.length}
              </Flex>
              <Flex align={"center"} gap={"2"}>
                <Box as={AiFillHeart} fontSize={"1.5rem"} />
                {likes?.length}
              </Flex>
            </Flex>
          </GridItem>
        );
      })}
    </Grid>
  );
};
