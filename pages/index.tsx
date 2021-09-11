import debounce from "lodash-es/debounce";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { color } from "../components/SearchPanel/ColorFilter";
import {
  orientation,
  SearchPanel,
} from "../components/SearchPanel/SearchPanel";
import { Thumbnail } from "../components/Thumbnail";
import { ThumbnailGrid } from "../components/ThumbnailGrid";

const makeRequest = async (
  path: string,
  params?: Record<string, string | number>
) => {
  const headers = new Headers();
  headers.append(
    "Authorization",
    "Client-ID " + process.env.NEXT_PUBLIC_UNSPLASH_API_KEY
  );

  const url = new URL(`https://api.unsplash.com${path}`);
  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key].toString())
    );
  }

  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  // @ts-ignore
  return fetch(url, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};

const Home: NextPage<{ initialCollection?: ImageData[] }> = ({
  initialCollection,
}) => {
  const [results, setResults] = useState<ImageData[]>([]);

  useEffect(() => {
    if (initialCollection) {
      setResults(initialCollection);
    }
  }, [initialCollection]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchParametersChange = useCallback(
    debounce(async (data) => {
      if (data.searchQuery.length > 2) {
        const params: Record<string, string> = {
          query: data.searchQuery,
          order_by: data.sortOrder,
        };

        if (data.color !== color.all) {
          params.color = data.color;
        }
        if (data.orientation !== orientation.any) {
          params.orientation = data.orientation;
        }

        const jsonResponse: { results: ImageData[] } = await makeRequest(
          "/search/photos",
          params
        );

        setResults(jsonResponse.results);
      }
    }, 300),
    []
  );

  return (
    <>
      <SearchPanel onChange={handleSearchParametersChange} />
      <ThumbnailGrid>
        <>
          {results?.map((collectionItem) => (
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
  const responseJson = await makeRequest("/collections/2423569/photos");
  return {
    props: {
      initialCollection: responseJson,
    },
  };
}
