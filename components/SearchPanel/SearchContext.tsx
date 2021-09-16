import { createContext, ReactChild, useContext, useState } from "react";

export const enum SearchStatus {
  idle,
  loading,
  error,
  noResults,
}

const SearchContext = createContext<{
  results: ImageData[];
  status: SearchStatus;
  updateResults: (newValue: ImageData[]) => void;
  updateStatus: (newValue: SearchStatus) => void;
}>({
  results: [],
  updateResults: () => {},
  status: SearchStatus.idle,
  updateStatus: () => {},
});

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [results, setResults] = useState<ImageData[]>([]);
  const [status, setStatus] = useState<SearchStatus>(SearchStatus.idle);

  const updateResults = (newValue: ImageData[]) => {
    setResults(newValue);
  };

  const updateStatus = (newValue: SearchStatus) => {
    setStatus(newValue);
  };

  return (
    <SearchContext.Provider
      value={{ results, status, updateResults, updateStatus }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export type SearchContextProviderProps = {
  children: ReactChild;
};

export const useSearch = () => {
  return useContext(SearchContext);
};
