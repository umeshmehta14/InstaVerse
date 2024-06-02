import {
  AspectRatio,
  Flex,
  GridItem,
  useColorMode,
  Grid,
} from "@chakra-ui/react";
import React from "react";
import { profileMainBox } from "../../../styles/ProfileStyles";
import ContentLoader from "react-content-loader";

export const ExploreSkeleton = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      {...profileMainBox}
      w={"100%"}
      h={"100vh"}
      bg={colorMode === "dark" ? "black.900" : "white.500"}
    >
      <Grid
        templateColumns="repeat(3, minmax(104px, 1fr))"
        width={"100%"}
        gap={"1"}
      >
        {new Array(12).fill(null)?.map((_, n) => (
          <GridItem key={n}>
            <AspectRatio ratio={1}>
              <ContentLoader
                speed={2}
                width="100%"
                height={"100%"}
                viewBox="0 0 400 300"
                backgroundColor={colorMode === "dark" ? "gray" : "#EDF2F7"}
                foregroundColor={colorMode === "dark" ? "#1A202C" : "#E2E8F0"}
              >
                <rect x="0" y="0" rx="6" ry="6" width="100%" height={"100%"} />
              </ContentLoader>
            </AspectRatio>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};
