import { Grid, GridItem, Image } from "@chakra-ui/react";
import React from "react";
import { usePost } from "../../../contexts";

const PostSection = () => {
  const {
    postState: { userAllPost },
  } = usePost();
  return (
    <Grid templateColumns="repeat(3, minmax(128px, 1fr))" gap={"1"}>
      {userAllPost?.map((post) => {
        const { mediaUrl, _id, comment } = post;
        return (
          <GridItem key={_id}>
            <Image
              src={mediaUrl}
              alt="Post"
              objectFit="fill"
              h={"100%"}
              minH={"128px"}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default PostSection;
