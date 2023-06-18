import { Grid, GridItem, Image, AspectRatio } from "@chakra-ui/react";
import React from "react";

const GridBox = ({ showingPost }) => {
  return (
    <Grid
      templateColumns="repeat(3, minmax(104px, 1fr))"
      width={"100%"}
      gap={"1"}
    >
      {showingPost?.map((post) => {
        const { mediaUrl, _id, comment } = post;
        return (
          <GridItem key={_id}>
            <AspectRatio ratio={1}>
              <Image
                src={mediaUrl}
                alt="Post"
                objectFit="fill"
                h={"100%"}
                w={"100%"}
              />
            </AspectRatio>
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default GridBox;
