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
import { IntersectionObservable } from "../components/IntersectionObservable";
import { useRouter } from "next/router";
import { CircularProgress } from "@chakra-ui/progress";
import { Box } from "@chakra-ui/layout";

const enum windowWidth {
  base,
  md,
}

const pageConfig = {
  perPage: {
    [windowWidth.base]: 7,
    [windowWidth.md]: 15,
  },
  scrollThreshold: {
    [windowWidth.base]: 2,
    [windowWidth.md]: 3,
  },
};

const makeRequest = async (path: string, params?: Record<string, string>) => {
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
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (initialCollection) {
      setResults(initialCollection);
    }
  }, [initialCollection]);

  const [currentWindowWidth, setCurrentWindowWidth] = useState<windowWidth>(
    windowWidth.md
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleWindowResize = useCallback(
    debounce(() => {
      console.log(window.innerWidth);
      if (window.innerWidth > 650) {
        setCurrentWindowWidth(windowWidth.md);
      } else {
        setCurrentWindowWidth(windowWidth.base);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchParametersChange = useCallback(
    debounce(async (data) => {
      if (data.query?.length > 2) {
        const params: Record<string, string> = {
          query: data.query,
          order_by: data.order,
          per_page: pageConfig.perPage[currentWindowWidth].toString(),
          page: data.page || "1",
        };

        if (data.color !== color.all) {
          params.color = data.color;
        }
        if (data.orientation !== orientation.all) {
          params.orientation = data.orientation;
        }

        const jsonResponse: { total_pages: number; results: ImageData[] } =
          await makeRequest("/search/photos", params);

        setTotalPages(jsonResponse.total_pages);

        if (data.shouldClearResults) {
          setResults(jsonResponse.results);
        } else {
          setResults((prevResults) => prevResults.concat(jsonResponse.results));
        }
      }
    }, 300),
    [currentWindowWidth]
  );

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const urlSearchParams = new URLSearchParams(url.substring(1));
      const queryParams = Object.fromEntries(urlSearchParams.entries());
      const { query, order, color, orientation } = queryParams;

      handleSearchParametersChange({
        query,
        order,
        color,
        orientation,
        shouldClearResults: true,
      });
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const loadNextPage = () => {
    if (currentPage >= totalPages) return;

    const { query, order, color, orientation } = router.query;

    setCurrentPage(currentPage + 1);

    handleSearchParametersChange({
      query,
      order,
      color,
      orientation,
      page: currentPage,
    });
  };

  return (
    <>
      <SearchPanel />
      <ThumbnailGrid>
        <>
          {results?.map((collectionItem, index) => (
            <div key={collectionItem.id}>
              {index ===
                results.length -
                  pageConfig.scrollThreshold[currentWindowWidth] -
                  1 && <IntersectionObservable onVisible={loadNextPage} />}

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
  const responseJson = await makeRequest("/collections/2423569/photos", {
    per_page: "15",
  });
  return {
    props: {
      initialCollection: responseJson,
    },
  };
}
