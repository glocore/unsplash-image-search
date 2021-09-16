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
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { IoRefreshOutline } from "react-icons/io5";
import { Fade } from "../components/Fade";
import { Header, useHeader } from "../components/Header";
import { ImagePreview } from "../components/ImagePreview";
import { IntersectionObservable } from "../components/IntersectionObservable";
import { NoResultsFound } from "../components/NoResultsFound";
import { SearchPanel, SearchParams } from "../components/SearchPanel";
import { Color } from "../components/SearchPanel/ColorFilter";
import { Orientation } from "../components/SearchPanel/FilterOptions";
import { Order } from "../components/SearchPanel/SortOrder";
import { SkipToContent } from "../components/SkipToContent";
import { Thumbnail, ThumbnailLink } from "../components/Thumbnail";
import { ThumbnailGrid } from "../components/ThumbnailGrid";
import {
  ImageData,
  RequestStatus,
  unsplashApi,
  useUnsplashSearch,
} from "../unsplash";
import { useNetworkStatus } from "../utils";

const enum PageStatus {
  /**
   * Search yet to be performed / search query was reset.
   */
  initial,
  /**
   * No more search results.
   */
  idle,
  /**
   * Loading more search results.
   */
  loading,
  /**
   * There was an error fetching search results.
   */
  error,
  /**
   * Search returned no results.
   */
  noResultsFound,
}

const Home: NextPage<{ initialCollection?: ImageData[] }> = ({
  initialCollection = [],
}) => {
  const [selectedImageData, setSelectedImageData] = useState<ImageData>();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    color: Color.all,
    order: Order.relevance,
    orientation: Orientation.all,
  });
  const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.initial);

  const headerRef = useRef<HTMLDivElement>(null);
  const firstThumbnailRef = useRef<HTMLAnchorElement>(null);

  const router = useRouter();
  const { isOffline } = useNetworkStatus();
  const { isHeaderFloating } = useHeader();
  const {
    status: searchStatus,
    results,
    loadMore,
    retry,
  } = useUnsplashSearch({
    pageSize: 15,
    ...searchParams,
  });

  useEffect(() => {
    if (searchStatus === RequestStatus.error) {
      // There was an error in fetching search results
      setPageStatus(PageStatus.error);
    } else if (results) {
      // Search was performed

      if (results.length < 1) {
        // Search returned no results
        setPageStatus(PageStatus.noResultsFound);
      } else {
        setPageStatus(
          {
            [RequestStatus.idle]: PageStatus.idle,
            [RequestStatus.loading]: PageStatus.loading,
            [RequestStatus.error]: PageStatus.error,
          }[searchStatus]
        );
      }
    } else {
      if (searchStatus === RequestStatus.loading) {
        setPageStatus(PageStatus.loading);
      } else {
        // Search is yet to begin (or) search term was reset
        setPageStatus(PageStatus.initial);
      }
    }
  }, [initialCollection, results, searchStatus]);

  const handleSearchParamsChange = (
    updaterFn: (oldValue: SearchParams) => SearchParams
  ) => {
    const newValue = updaterFn(searchParams);
    setSearchParams(newValue);
  };

  const renderNoResultsFound = pageStatus === PageStatus.noResultsFound;
  const renderInitialCollection = pageStatus === PageStatus.initial;
  const renderLoading = pageStatus === PageStatus.loading;
  const renderError = pageStatus === PageStatus.error;
  const renderSearchResults =
    pageStatus !== PageStatus.initial &&
    pageStatus !== PageStatus.noResultsFound;

  return (
    <>
      <SkipToContent
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            firstThumbnailRef.current?.focus();
          }
        }}
      >
        Skip to content
      </SkipToContent>
      {/* @ts-ignore */}
      <Header ref={headerRef} float={isHeaderFloating}>
        <SearchPanel
          searchParams={searchParams}
          onChange={handleSearchParamsChange}
          disabled={isOffline}
        />
      </Header>
      {renderNoResultsFound && <NoResultsFound />}
      {renderInitialCollection && (
        <ThumbnailGrid
          pt={isHeaderFloating ? `${headerRef?.current?.clientHeight}px` : 0}
        >
          {initialCollection.map((imageData, index) => (
            <ThumbnailLink
              key={imageData.id}
              onClick={() => setSelectedImageData(imageData)}
              ref={index > 0 ? undefined : firstThumbnailRef}
              id={imageData.id}
            >
              <Thumbnail
                imageUrl={imageData.urls.small}
                blurhash={imageData.blur_hash}
                altDescription={imageData.alt_description}
                height={300}
                width="100%"
              />
            </ThumbnailLink>
          ))}
        </ThumbnailGrid>
      )}

      {renderSearchResults && (
        <ThumbnailGrid
          pt={isHeaderFloating ? `${headerRef?.current?.clientHeight}px` : 0}
        >
          {results?.map((imageData, index) => (
            <ThumbnailLink
              key={imageData.id}
              onClick={() => setSelectedImageData(imageData)}
              ref={index > 0 ? undefined : firstThumbnailRef}
              id={imageData.id}
            >
              {index === results!.length - 7 && (
                <IntersectionObservable onVisible={loadMore} />
              )}

              <Thumbnail
                imageUrl={imageData.urls.small}
                blurhash={imageData.blur_hash}
                altDescription={imageData.alt_description}
                height={300}
                width="100%"
              />
            </ThumbnailLink>
          ))}
        </ThumbnailGrid>
      )}

      {renderLoading && (
        <Fade>
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
        </Fade>
      )}

      {renderError && (
        <Fade>
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
              onClick={retry}
            />
          </Box>
        </Fade>
      )}

      <Modal
        onClose={() => router.push("/", undefined, { shallow: true })}
        size="full"
        isOpen={!!router.query.id}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent minH="95vh" h="100%" bottom="-5vh">
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
            <ImagePreview imageData={selectedImageData!} offline={isOffline} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const responseJson = await unsplashApi("/collections/2423569/photos", {
    per_page: "30",
  });
  return {
    props: {
      initialCollection: responseJson,
    },
  };
}
