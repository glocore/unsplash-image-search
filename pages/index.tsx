import { Box } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import type { NextPage } from "next";
import { IntersectionObservable } from "../components/IntersectionObservable";
import { SearchPanel } from "../components/SearchPanel/SearchPanel";
import { Thumbnail } from "../components/Thumbnail";
import { ThumbnailGrid } from "../components/ThumbnailGrid";
import { unsplashApi, useUnsplashSearch } from "../unsplash";

const Home: NextPage<{ initialCollection?: ImageData[] }> = ({
  initialCollection,
}) => {
  const { results, loadMore } = useUnsplashSearch({ pageSize: 15 });

  let images = initialCollection;
  if (results && results.length) {
    images = results;
  }

  return (
    <>
      <SearchPanel />
      <ThumbnailGrid>
        <>
          {images?.map((collectionItem, index) => (
            <div key={collectionItem.id}>
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
    </>
  );
};

export default Home;

type ImageData = {
  id: string;
  blur_hash: string;
  alt_description: string;
  urls: {
    small: string;
  };
};

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
