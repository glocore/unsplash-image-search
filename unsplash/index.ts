import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Color } from "../components/SearchPanel/ColorFilter";
import { Ordering, Orientation } from "../components/SearchPanel/SearchPanel";

export const unsplashApi = async (
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
  const response = await fetch(url, requestOptions);
  const responseJson = await response.json();

  if (response.status !== 200) {
    throw Error(responseJson);
  }

  return responseJson;
};

export const useUnsplashSearch = ({
  pageSize = 15,
}: {
  pageSize?: number;
}): {
  results: ImageData[];
  loadMore: () => void;
} => {
  const [results, setResults] = useState<ImageData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const router = useRouter();
  const { query, order, orientation, color } = router.query as {
    query: string;
    orientation: Orientation;
    color: Color;
    order: Ordering;
  };

  const fetchNextPage = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    const params: Record<string, string | number> = {
      page: nextPage,
      pageSize,
      query,
      order,
    };

    if (color !== Color.all) {
      params.color = color;
    }

    if (orientation !== Orientation.all) {
      params.orientation = orientation;
    }

    const responseJson = await unsplashApi("/search/photos", params);

    setResults((oldResults) => oldResults.concat(responseJson.results));
  };

  useEffect(() => {
    const resetResults = async () => {
      if (!query || query?.length < 3) return;

      const nextPage = 1;
      setCurrentPage(nextPage);

      const params: Record<string, string | number> = {
        page: nextPage,
        pageSize,
        query,
        order,
      };

      if (color !== Color.all) {
        params.color = color;
      }

      if (orientation !== Orientation.all) {
        params.orientation = orientation;
      }

      const responseJson = await unsplashApi("/search/photos", params);

      setResults(responseJson.results);
    };

    resetResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, order, orientation, query]);

  const loadMore = fetchNextPage;

  return {
    results,
    loadMore,
  };
};

export const useUnsplashImage = (
  id: string
): { loading: boolean; error: boolean; imageData?: ImageData } => {
  const [imageData, setImageData] = useState<ImageData | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImageData = async () => {
      setLoading(true);

      try {
        const responseJson = await unsplashApi(`/photos/${id}`);
        setImageData(responseJson);
      } catch (error) {
        setError(true);
        console.error(error);
      }

      setLoading(false);
    };

    if (typeof id === "string" && id.length) {
      fetchImageData();
    }
  }, [id]);

  return { imageData, loading, error };
};

export type ImageData = {
  id: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  width: number;
  height: number;
  created_at: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  links: {
    html: string;
  };
  user: {
    name: string;
  };
};
