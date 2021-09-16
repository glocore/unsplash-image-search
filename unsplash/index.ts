import { useCallback, useEffect, useState } from "react";
import { Color } from "../components/SearchPanel/ColorFilter";
import { Orientation } from "../components/SearchPanel/FilterOptions";

export const enum RequestStatus {
  initial,
  loading,
  error,
  completed,
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

export const useUnsplashImage = (id: string) => {
  const [imageData, setImageData] = useState<ImageData | undefined>();
  const [status, setStatus] = useState(RequestStatus.loading);

  const fetchImageData = useCallback(async () => {
    setStatus(RequestStatus.loading);

    try {
      const responseJson = await unsplashApi(`/photos/${id}`);
      setImageData(responseJson);
      setStatus(RequestStatus.completed);
    } catch (error) {
      setStatus(RequestStatus.error);
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    if (typeof id === "string" && id.length) {
      fetchImageData();
    }
  }, [fetchImageData, id]);

  return { imageData, status, retry: fetchImageData };
};

export type SearchQuery = {
  query: string;
  pageSize: number;
  order: string;
  color: string;
  orientation: string;
};

export const enum SearchStatus {
  initial = "initial",
  loading = "loading",
  completed = "completed",
  error = "error",
  noResults = "noResults",
}

export const useSearch = (
  { query, pageSize, order, color, orientation }: SearchQuery,
  initialData: ImageData[]
) => {
  const [results, setResults] = useState<ImageData[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchStatus, setFetchStatus] = useState<RequestStatus>(
    RequestStatus.initial
  );

  const fetchResults = useCallback(
    async (page: number) => {
      if (query.length < 3) {
        setResults(initialData);
        setFetchStatus(RequestStatus.initial);
        return;
      }

      const reqParams: Record<string, string | number> = {
        query: query.trim(),
        per_page: pageSize,
        order,
        page,
      };

      if (color !== Color.all) {
        reqParams.color = color;
      }

      if (orientation !== Orientation.all) {
        reqParams.orientation = orientation;
      }

      setFetchStatus(RequestStatus.loading);

      let responseResults = [];

      try {
        const responseJson = await unsplashApi("/search/photos", reqParams);

        responseResults = responseJson.results;
        setFetchStatus(RequestStatus.completed);
      } catch (error) {
        setFetchStatus(RequestStatus.error);
      }

      return responseResults;
    },
    [color, initialData, order, orientation, pageSize, query]
  );

  const loadMore = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    const results = await fetchResults(nextPage);
    setResults((oldResults) => oldResults.concat(results || []));
  };

  const retry = async () => {
    const results = await fetchResults(currentPage);
    setResults((oldResults) => oldResults.concat(results || []));
  };

  // Fetch new results when query changes
  useEffect(() => {
    const resetResults = async () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      const page = 1;
      setCurrentPage(page);
      const results = await fetchResults(page);
      setResults(results || initialData);
    };

    resetResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchResults]);

  const status = (() => {
    let _status = SearchStatus.initial;

    if (fetchStatus === RequestStatus.completed && results.length === 0) {
      _status = SearchStatus.noResults;
    } else {
      _status = {
        [RequestStatus.initial]: SearchStatus.initial,
        [RequestStatus.loading]: SearchStatus.loading,
        [RequestStatus.error]: SearchStatus.error,
        [RequestStatus.completed]: SearchStatus.completed,
      }[fetchStatus];
    }

    return _status;
  })();

  return {
    status,
    results,
    loadMore,
    retry,
  };
};

export type ImageData = {
  id: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  width: number;
  height: number;
  color: string;
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
