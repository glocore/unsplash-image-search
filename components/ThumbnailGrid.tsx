import { Box, BoxProps, SimpleGrid } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

export const ThumbnailGrid = ({ children, ...rest }: ThumbnailGridProps) => {
  return (
    <Box
      mr="auto"
      ml="auto"
      pl={{ base: 2, md: 8 }}
      pr={{ base: 2, md: 8 }}
      pb={100}
      maxW="80em"
      {...rest}
    >
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3 }}
        spacing={4}
        overflow="hidden"
      >
        {children}
      </SimpleGrid>
    </Box>
  );
};

export type ThumbnailGridProps = PropsWithChildren<BoxProps>;
