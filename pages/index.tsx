import { Box } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { IconButton, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { IoRefreshOutline } from "react-icons/io5";
import { Fade } from "../components/Fade";
import { Header, useHeader } from "../components/Header";
import { ImagePreviewModal } from "../components/ImagePreviewModal";
import { IntersectionObservable } from "../components/IntersectionObservable";
import { NoResultsFound } from "../components/NoResultsFound";
import { SearchPanel, SearchParams } from "../components/SearchPanel";
import { Color } from "../components/SearchPanel/ColorFilter";
import { Orientation } from "../components/SearchPanel/FilterOptions";
import { Order } from "../components/SearchPanel/SortOrder";
import { SkipToContent } from "../components/SkipToContent";
import { Thumbnail, ThumbnailLink } from "../components/Thumbnail";
import { ThumbnailGrid } from "../components/ThumbnailGrid";
import { ImageData, SearchStatus, unsplashApi, useSearch } from "../unsplash";
import { useNetworkStatus } from "../utils";

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
  } = useSearch(
    {
      pageSize: 15,
      ...searchParams,
    },
    initialCollection
  );

  const handleSearchParamsChange = (
    updaterFn: (oldValue: SearchParams) => SearchParams
  ) => {
    const newValue = updaterFn(searchParams);
    setSearchParams(newValue);
  };

  const renderNoResultsFound = searchStatus === SearchStatus.noResults;
  const renderLoading = searchStatus === SearchStatus.loading;
  const renderError = searchStatus === SearchStatus.error;
  const renderSearchResults = searchStatus !== SearchStatus.noResults;

  console.log({ results, initialCollection });

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
      {renderSearchResults && (
        <ThumbnailGrid
          pt={isHeaderFloating ? `${headerRef?.current?.clientHeight}px` : 0}
        >
          {results.map((imageData, index) => (
            <ThumbnailLink
              key={imageData.id}
              onClick={() => setSelectedImageData(imageData)}
              ref={index > 0 ? undefined : firstThumbnailRef}
              id={imageData.id}
            >
              {index === results.length - 7 && (
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

      <ImagePreviewModal imageData={selectedImageData!} offline={isOffline} />
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
