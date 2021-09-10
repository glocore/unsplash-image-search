import { Box } from "@chakra-ui/layout";
import Image from "next/image";
import styles from "./Thumbnail.module.css";
import { css } from "@emotion/react";
import { useState } from "react";
import { Blurhash } from "react-blurhash";

export const Thumbnail = (props: ThumbnailProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      pos="relative"
      transition="all .2s"
      w={props.width}
      h={props.height}
      cursor="pointer"
      css={css`
        &:hover {
          transform: scale(1.02);
          box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.04),
            0px 20px 25px -5px rgba(0, 0, 0, 0.1);
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
      <Image
        src={props.imageUrl}
        // width={props.width}
        // height={props.height}
        alt={props.altDescription}
        quality={100}
        objectFit="cover"
        layout="fill"
        onLoadingComplete={() => setLoaded(true)}
        className={`${styles.thumbnailImage} ${
          loaded ? styles.thumbnailImageVisible : ""
        }`}
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
