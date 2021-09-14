import { useCallback, useEffect, useState } from "react";
import { Color } from "../components/ColorFilter";
import { Orientation } from "../components/SearchPanel";

export const enum RequestStatus {
  idle,
  loading,
  error,
}

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
  query,
  pageSize,
  order,
  color,
  orientation,
}: {
  query: string;
  pageSize: number;
  order: string;
  color: string;
  orientation: string;
}) => {
  const [results, setResults] = useState<ImageData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.idle);

  const fetchResults = useCallback(
    async (page: number) => {
      if (query.length < 3) return;

      const reqParams: Record<string, string | number> = {
        query: query.trim(),
        page_size: pageSize,
        order,
        page,
      };

      if (color !== Color.all) {
        reqParams.color = color;
      }

      if (orientation !== Orientation.all) {
        reqParams.orientation = orientation;
      }

      setStatus(RequestStatus.loading);

      let results = [];

      try {
        const responseJson = await unsplashApi("/search/photos", reqParams);

        results = responseJson?.results;
        setStatus(RequestStatus.idle);
      } catch (error) {
        setStatus(RequestStatus.error);
      }

      return results;
    },
    [color, order, orientation, pageSize, query]
  );

  const loadMore = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    const results = await fetchResults(nextPage);
    setResults((oldResults) => (oldResults || []).concat(results || []));
  };

  // Fetch new results when query changes
  useEffect(() => {
    const resetResults = async () => {
      const page = 1;
      setCurrentPage(page);
      const results = await fetchResults(page);

      setResults(results);
    };

    resetResults();
  }, [fetchResults]);

  return {
    status,
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
