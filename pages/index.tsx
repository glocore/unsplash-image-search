import { Box } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { ImagePreview } from "../components/ImagePreview";
import { IntersectionObservable } from "../components/IntersectionObservable";
import { SearchPanel } from "../components/SearchPanel/SearchPanel";
import { Thumbnail } from "../components/Thumbnail";
import { ThumbnailGrid } from "../components/ThumbnailGrid";
import { ImageData, unsplashApi, useUnsplashSearch } from "../unsplash";
const Home: NextPage<{ initialCollection?: ImageData[] }> = ({
  initialCollection,
}) => {
  const { results, loadMore } = useUnsplashSearch({ pageSize: 15 });

  let images = initialCollection;
  if (results && results.length) {
    images = results;
  }

  const router = useRouter();

  const [selectedImageData, setSelectedImageData] = useState<ImageData>();

  return (
    <>
      <SearchPanel />
      <ThumbnailGrid>
        <>
          {images?.map((collectionItem, index) => (
            <Link
              key={collectionItem.id}
              href={`/?id=${collectionItem.id}`}
              as={`/images/${collectionItem.id}`}
              passHref
              shallow
            >
              <div onClick={() => setSelectedImageData(collectionItem)}>
                {index === results.length - 4 && (
                  <IntersectionObservable onVisible={loadMore} />
                )}

                <Thumbnail
                  imageUrl={collectionItem.urls.small}
                  blurhash={collectionItem.blur_hash}
                  altDescription={collectionItem.alt_description}
                  height={300}
                  width="100%"
                />
              </div>
            </Link>
          ))}
        </>
      </ThumbnailGrid>

      <Box
        w="100%"
        pt={10}
        pb="30em"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress isIndeterminate />
      </Box>
      <Modal
        onClose={() => router.push("/", undefined, { shallow: true })}
        size="full"
        isOpen={!!router.query.id}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent minH="95vh" bottom="-5vh">
          <ModalHeader w="100%" pt={0} pl={0} pr={0} pb={{ base: 4, md: 10 }}>
            <Box
              maxW="80rem"
              w="100%"
              display="flex"
              justifyContent="flex-end"
              ml="auto"
              mr="auto"
              mb={{ base: 0, md: -2 }}
            >
              <IconButton
                aria-label="Close"
                icon={<FiX />}
                as={ModalCloseButton}
                variant="outline"
                right={{ base: 2, md: 8 }}
                top={{ base: 2, md: 4 }}
              />
            </Box>
          </ModalHeader>
          <ModalBody pl={0} pr={0} pt={0} h="100%">
            <ImagePreview imageData={selectedImageData} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const responseJson = await unsplashApi("/collections/2423569/photos", {
    per_page: "15",
  });
  return {
    props: {
      initialCollection: responseJson,
    },
  };
}
