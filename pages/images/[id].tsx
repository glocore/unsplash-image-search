import { Button, IconButton } from "@chakra-ui/button";
import { Box, Link } from "@chakra-ui/layout";
import { CircularProgress, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { IoRefreshOutline } from "react-icons/io5";
import { ImagePreview } from "../../components/ImagePreview";
import { RequestStatus, useUnsplashImage } from "../../unsplash";

const Loading = () => (
  <Box
    w="100%"
    h="80%"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <CircularProgress isIndeterminate />
  </Box>
);

const ErrorUI = (props: { onRetryClick: any }) => (
  <Box
    w="100%"
    pt={10}
    pb="30em"
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexDir="column"
  >
    <Text mb={2} fontSize="xl" color="gray.500">
      Something went wrong, try again?
    </Text>
    <IconButton
      icon={<IoRefreshOutline />}
      aria-label="Reload"
      borderRadius="50%"
      onClick={props.onRetryClick}
    />
  </Box>
);

const Image = () => {
  const router = useRouter();
  const { id } = router.query;
  const { imageData, status, retry } = useUnsplashImage(id as string);

  return (
    <Box
      w="100%"
      h={{ base: "calc(100vh - 64px - 8px)", md: "calc(100vh - 64px - 40px)" }}
    >
      <Box maxW="80rem" w="100%" mr="auto" ml="auto" p={{ base: 2, md: 8 }}>
        <Button leftIcon={<FiArrowLeft />} as={Link} href={"/"}>
          Home
        </Button>
      </Box>
      {status === RequestStatus.loading && <Loading />}
      {status === RequestStatus.error && <ErrorUI onRetryClick={retry} />}
      {status === RequestStatus.idle && imageData && (
        <ImagePreview imageData={imageData} />
      )}
    </Box>
  );
};

export default Image;
