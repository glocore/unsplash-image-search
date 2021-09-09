import { SimpleGrid } from "@chakra-ui/react";
import React, { ReactChild } from "react";

export const ThumbnailGrid = (props: ThumbnailGridProps) => {
  return (
    <SimpleGrid minChildWidth={250} gap={16}>
      {props.children}
    </SimpleGrid>
  );
};

export type ThumbnailGridProps = {
  children: ReactChild;
};
