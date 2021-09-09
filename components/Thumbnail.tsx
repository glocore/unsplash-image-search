import { Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { Fade } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useState } from "react";
import { Blurhash } from "react-blurhash";

export const Thumbnail = (props: ThumbnailProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      pos="relative"
      w={props.width}
      h={props.height}
      transition="transform 0.2s"
      cursor="pointer"
      css={css`
        &:hover {
          transform: scale(1.05);
        }
      `}
    >
      <Blurhash
        hash={props.blurhash}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
        }}
      />
      <Fade in={loaded}>
        <Image
          src={props.imageUrl}
          width="100%"
          height="100%"
          alt={props.altDescription}
          top={0}
          right={0}
          bottom={0}
          left={0}
          pos="absolute"
          onLoad={() => setLoaded(true)}
        />
      </Fade>
    </Box>
  );
};

export type ThumbnailProps = {
  blurhash: string;
  imageUrl: string;
  width: string | number;
  height: string | number;
  altDescription: string;
};
