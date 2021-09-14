import { Button, IconButton } from "@chakra-ui/button";
import { Box, Divider, Link, Text } from "@chakra-ui/layout";
import { CircularProgress, Image, Tooltip } from "@chakra-ui/react";
import { format } from "date-fns";
import { useState } from "react";
import {
  FiCalendar,
  FiExternalLink,
  FiGithub,
  FiTwitter,
  FiUser,
} from "react-icons/fi";
import { ImageData } from "../unsplash";

const Loading = () => {
  return (
    <Box
      w="100%"
      h="50vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress isIndeterminate />
    </Box>
  );
};

export const ImagePreview = ({ imageData }: ImagePreviewProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  let aspectRatioPercentage = 100;

  if (imageData) {
    aspectRatioPercentage = (imageData.height / imageData.width) * 100;
  }

  return (
    <Box
      display="flex"
      minH="100%"
      maxW="80rem"
      w="100%"
      mr="auto"
      ml="auto"
      // pt={{ base: 2, md: 8 }}
      pl={{ base: 2, md: 8 }}
      pr={{ base: 2, md: 8 }}
      flexDirection="column"
      justifyContent="space-between"
    >
      {!imageData ? (
        <Loading />
      ) : (
        <>
          <Box w="100%">
            <Box display="flex" justifyContent="center">
              {!imageLoaded && (
                <Box w="100%" pt={`min(80vh, ${aspectRatioPercentage}%)`} />
              )}
              <Image
                src={imageData.urls.full}
                alt={imageData.alt_description || imageData.description}
                maxH="80vh"
                opacity={imageLoaded ? 1 : 0}
                transition="all 0.3s"
                onLoad={() => setImageLoaded(true)}
              />
            </Box>
            <Box
              pt="2em"
              display="flex"
              w="100%"
              justifyContent="space-between"
            >
              <Text fontSize="xl" flex="1">
                {imageData.description || imageData.alt_description}
              </Text>
              <Button
                leftIcon={<FiExternalLink />}
                as={Link}
                href={imageData.links.html}
                isExternal
              >
                Unsplash
              </Button>
            </Box>
            <Text
              fontSize="sm"
              color="gray.600"
              display="flex"
              alignItems="center"
            >
              <FiUser style={{ marginInlineEnd: "1em" }} />
              {imageData.user.name}
            </Text>
            <Text
              fontSize="sm"
              color="gray.600"
              display="flex"
              lineHeight={2.5}
              alignItems="center"
            >
              <FiCalendar style={{ marginInlineEnd: "1em" }} />
              Published on{" "}
              {format(new Date(imageData.created_at), "MMMM dd, yyyy")}
            </Text>
          </Box>
          <Box mt={10}>
            <Divider />
            <Box
              w="100%"
              display="flex"
              justifyContent="center"
              pb="1.5em"
              pt="1.5em"
              as="footer"
            >
              <Tooltip
                label="Source Code"
                bg="gray.200"
                color="gray.800"
                openDelay={400}
              >
                <IconButton
                  aria-label="Project source code"
                  icon={<FiGithub />}
                  variant="link"
                  as={Link}
                  href="https://github.com/glocore/unsplash-image-search"
                  isExternal
                />
              </Tooltip>

              <Tooltip
                label="Twitter (@theglocore)"
                bg="gray.200"
                color="gray.800"
                openDelay={400}
              >
                <IconButton
                  aria-label="Project author's Twitter profile"
                  icon={<FiTwitter />}
                  variant="link"
                  as={Link}
                  href="https://twitter.com/theglocore"
                  isExternal
                />
              </Tooltip>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export type ImagePreviewProps = {
  imageData?: ImageData;
};
