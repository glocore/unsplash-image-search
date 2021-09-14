import { Box, SimpleGrid } from "@chakra-ui/react";
import React, { ReactChild } from "react";

export const ThumbnailGrid = (props: ThumbnailGridProps) => {
  return (
    <Box
      mr="auto"
      ml="auto"
      pl={{ base: 2, md: 8 }}
      pr={{ base: 2, md: 8 }}
      pt={150}
      pb={100}
      maxW="80em"
    >
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3 }}
        spacing={4}
        overflow="hidden"
      >
        {props.children}
      </SimpleGrid>
    </Box>
  );
};

export type ThumbnailGridProps = {
  children: ReactChild;
};
