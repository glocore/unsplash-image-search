import { Box } from "@chakra-ui/layout";
import { css } from "@emotion/react";
import React, { ReactChild } from "react";

export const Fade = (props: FadeProps) => {
  return (
    <Box
      animation="fadeIn 0.5s"
      css={css`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}
    >
      {props.children}
    </Box>
  );
};

export type FadeProps = {
  children: ReactChild;
};
