import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";
import { Blurhash } from "react-blurhash";

export const Thumbnail = (props: ThumbnailProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box pos="relative" w={props.width} h={props.height}>
      <Blurhash
        hash={props.blurhash}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
        }}
      />
      <Image
        src={props.imageUrl}
        alt={props.altDescription}
        objectFit="cover"
        onLoad={() => setLoaded(true)}
        opacity={loaded ? 1 : 0}
        transition="opacity .3s"
        position="absolute"
        h="100%"
        w="100%"
        top={0}
      />
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
