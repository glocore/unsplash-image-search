import { Button } from "@chakra-ui/button";
import { Box, Link } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { FiArrowLeft } from "react-icons/fi";
import { ImagePreview } from "../../components/ImagePreview";
import { useUnsplashImage } from "../../unsplash";

const Image = () => {
  const router = useRouter();
  const { id } = router.query;
  const { imageData } = useUnsplashImage(id as string);

  return (
    <Box w="100%" h={{ base: "calc(100vh - 48px)", md: "calc(100vh - 72px)" }}>
      <Box maxW="80rem" w="100%" mr="auto" ml="auto" p={{ base: 2, md: 8 }}>
        <Button leftIcon={<FiArrowLeft />} as={Link} href={"/"}>
          Home
        </Button>
      </Box>
      <ImagePreview imageData={imageData} />
    </Box>
  );
};

export default Image;
