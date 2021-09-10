import { Box } from "@chakra-ui/layout";
import type { NextPage } from "next";
import { SearchPanel } from "../components/SearchPanel/SearchPanel";
import { Thumbnail } from "../components/Thumbnail";
import { ThumbnailGrid } from "../components/ThumbnailGrid";

const Home: NextPage<{ initialCollection?: CollectionItem[] }> = ({
  initialCollection,
}) => {
  return (
    <Box mr={8} ml={8} minH="100vh">
      <SearchPanel onChange={console.log} />
      <ThumbnailGrid>
        <>
          {initialCollection?.map((collectionItem) => (
            <Thumbnail
              key={collectionItem.id}
              imageUrl={collectionItem.urls.small}
              blurhash={collectionItem.blur_hash}
              altDescription={collectionItem.alt_description}
              height={300}
              width="100%"
            />
          ))}
        </>
      </ThumbnailGrid>
    </Box>
  );
};

export default Home;

type CollectionItem = {
  id: string;
  blur_hash: string;
  alt_description: string;
  urls: {
    small: string;
  };
};

export async function getStaticProps() {
  const headers = new Headers();
  headers.append(
    "Authorization",
    "Client-ID " + process.env.NEXT_PUBLIC_UNSPLASH_API_KEY
  );

  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  const responseJson = await fetch(
    "https://api.unsplash.com/collections/2423569/photos",
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
  return {
    props: {
      initialCollection: responseJson,
    },
  };
}
