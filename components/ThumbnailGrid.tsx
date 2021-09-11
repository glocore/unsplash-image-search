import { SimpleGrid, Box } from "@chakra-ui/react";
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
      minH="100vh"
      maxW="80em"
    >
      <SimpleGrid minChildWidth={300} gap={4} overflow="hidden">
        {props.children}
      </SimpleGrid>
    </Box>
  );
};

export type ThumbnailGridProps = {
  children: ReactChild;
};
