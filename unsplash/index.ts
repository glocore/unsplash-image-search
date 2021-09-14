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
  const [results, setResults] = useState<ImageData[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.idle);

  const fetchResults = useCallback(
    async (page: number) => {
      if (query.length < 3) {
        setResults(null);
        setStatus(RequestStatus.idle);
        return;
      }

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

      let results = null;

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

  const retry = async () => {
    const results = await fetchResults(currentPage);
    setResults((oldResults) =>
      oldResults ? oldResults.concat(results || []) : results
    );
  };

  // Fetch new results when query changes
  useEffect(() => {
    const resetResults = async () => {
      const page = 1;
      setCurrentPage(page);
      const results = await fetchResults(page);

      setResults(results);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    resetResults();
  }, [fetchResults]);

  console.log("requestStatus: ", status);

  return {
    status,
    results,
    loadMore,
    retry,
  };
};

export const useUnsplashImage = (id: string) => {
  const [imageData, setImageData] = useState<ImageData | undefined>();
  const [status, setStatus] = useState(RequestStatus.loading);

  const fetchImageData = useCallback(async () => {
    setStatus(RequestStatus.loading);

    try {
      const responseJson = await unsplashApi(`/photos/${id}`);
      setImageData(responseJson);
    } catch (error) {
      setStatus(RequestStatus.error);
      console.error(error);
    }

    setStatus(RequestStatus.idle);
  }, [id]);

  useEffect(() => {
    if (typeof id === "string" && id.length) {
      fetchImageData();
    } else {
      setStatus(RequestStatus.error);
    }
  }, [fetchImageData, id]);

  return { imageData, status, retry: fetchImageData };
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
