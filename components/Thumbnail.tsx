import {
  Box,
  forwardRef,
  Image,
  Link as ChakraLink,
  LinkProps,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { PropsWithChildren, useState } from "react";
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

export const ThumbnailLink = forwardRef<ThumbnailLinkProps, typeof ChakraLink>(
  ({ children, id, ...rest }, ref) => {
    return (
      <NextLink href={`/?id=${id}`} as={`/images/${id}`} passHref shallow>
        <ChakraLink
          ref={ref}
          tabIndex={0}
          role="gridcell"
          transition="all .2s"
          cursor="pointer"
          _focus={{
            transform: "scale(0.95)",
            outlineColor: "blue.600",
            outlineStyle: "solid",
            outlineWidth: "2px",
            outlineOffset: "5px",
          }}
          _active={{
            transform: "scale(0.98)",
          }}
          _hover={{
            transform: "scale(1.02)",
            boxShadow:
              "0px 10px 10px -5px rgba(0, 0, 0, 0.04), \
              0px 20px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
          {...rest}
        >
          {children}
        </ChakraLink>
      </NextLink>
    );
  }
);

export type ThumbnailLinkProps = PropsWithChildren<LinkProps> & {
  id: string;
};
