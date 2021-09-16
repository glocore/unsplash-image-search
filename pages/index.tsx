import { Fade } from "@chakra-ui/transition";
import type { NextPage } from "next";
import React, { useRef, useState } from "react";
import {
  Color,
  ErrorNotice,
  Header,
  ImagePreviewModal,
  IntersectionObservable,
  Loading,
  NoResultsFound,
  Order,
  Orientation,
  SearchPanel,
  SearchParams,
  SkipToContent,
  Thumbnail,
  ThumbnailGrid,
  ThumbnailLink,
  useHeader,
} from "../components";
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
          <Loading pt={10} pb="30em" />
        </Fade>
      )}

      {renderError && (
        <Fade>
          <ErrorNotice onRetryClick={retry} pt={10} pb="30em" />
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
