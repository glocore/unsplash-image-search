import { SimpleGrid } from "@chakra-ui/react";
import React, { ReactChild } from "react";

export const ThumbnailGrid = (props: ThumbnailGridProps) => {
  return (
    <SimpleGrid minChildWidth={300} gap={4} overflow="hidden">
      {props.children}
    </SimpleGrid>
  );
};

export type ThumbnailGridProps = {
  children: ReactChild;
};
