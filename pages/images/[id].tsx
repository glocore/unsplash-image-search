import { Box, Button, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { ErrorNotice, ImagePreview, Loading } from "../../components";
import { RequestStatus, useUnsplashImage } from "../../unsplash";

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
      {status === RequestStatus.loading && <Loading h="80%" />}
      {status === RequestStatus.error && (
        <ErrorNotice onRetryClick={retry} h="80%" />
      )}
      {status === RequestStatus.completed && imageData && (
        <ImagePreview imageData={imageData} />
      )}
    </Box>
  );
};

export default Image;
