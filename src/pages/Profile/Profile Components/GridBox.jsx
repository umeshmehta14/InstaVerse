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

import { FaComment, AiFillHeart } from "../../../utils/Icons";

const GridBox = ({ showingPost }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Grid
      templateColumns="repeat(3, minmax(104px, 1fr))"
      width={"100%"}
      gap={"1"}
    >
      {showingPost?.map((post) => {
        const {
          mediaUrl,
          _id,
          comments,
          likes: { likedBy },
        } = post;
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
              <Image
                src={mediaUrl}
                alt="Post"
                objectFit="fill"
                h={"100%"}
                w={"100%"}
                maxW={"293px"}
                maxH={"293px"}
              />
            </AspectRatio>
            <Flex
              display={isHovered ? "flex" : "none"}
              pos={"absolute"}
              top="0"
              justifyContent="center"
              w="100%"
              alignItems="center"
              height="100%"
              bg={"#00000069"}
              gap={"3rem"}
              color={"white"}
              maxW={"293px"}
              maxH={"293px"}
            >
              <Flex align={"center"} gap={"2"}>
                <Box as={FaComment} fontSize={"1.5rem"} />
                {comments?.length}
              </Flex>
              <Flex align={"center"} gap={"2"}>
                <Box as={AiFillHeart} fontSize={"1.5rem"} />
                {likedBy?.length}
              </Flex>
            </Flex>
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default GridBox;
