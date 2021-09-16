import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
  UseMenuOptionGroupProps,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import React, {
  ChangeEventHandler,
  createContext,
  ReactChild,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Color } from "./ColorFilter";
import { FilterOptions, Orientation } from "./FilterOptions";
import { Order, SortOrder } from "./SortOrder";
import { ToggleFilters } from "./ToggleFilters";

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

export { Color };

export const SearchPanel = ({
  searchParams,
  disabled,
  onChange,
}: SearchPanelProps) => {
  const [isFiltersPanelVisible, setIsFiltersPanelVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleFiltersPanel = () => {
    setIsFiltersPanelVisible(!isFiltersPanelVisible);
  };

  const hotkeyListener = useCallback((e: KeyboardEvent) => {
    if (e.key === "/") {
      e.preventDefault();
      searchInputRef?.current?.select();
      window.removeEventListener("keypress", hotkeyListener);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keypress", hotkeyListener);
    return () => window.removeEventListener("keypress", hotkeyListener);
  }, [hotkeyListener]);

  const handleSearchInputFocus = () => {
    searchInputRef?.current?.select();
    window.removeEventListener("keypress", hotkeyListener);
  };

  const handleSearchInputBlur = () => {
    window.addEventListener("keypress", hotkeyListener);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearchQueryUpdate = useCallback(
    debounce(
      (newValue) => onChange((oldValue) => ({ ...oldValue, query: newValue })),
      300
    ),
    []
  );

  const handleSearchQueryChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setSearchQuery(event.target.value);
    debouncedSearchQueryUpdate(event.target.value);
  };

  const handleOrderChange: UseMenuOptionGroupProps["onChange"] = (newValue) => {
    onChange((oldValue) => ({ ...oldValue, order: newValue as Order }));
  };

  const handleFiltersChange = (
    updaterFn: (oldValue: FilterOptions) => FilterOptions
  ) => {
    const newValue = updaterFn({
      color: searchParams.color,
      orientation: searchParams.orientation,
    });
    onChange((oldValue) => ({ ...oldValue, ...newValue }));
  };

  return (
    <>
      <InputGroup size="lg">
        <InputLeftElement width="initial" left={4}>
          <Box display="inline-flex" alignItems="center" marginRight={8}>
            <Kbd bg="gray.100" color="gray.400">
              /
            </Kbd>
          </Box>
        </InputLeftElement>
        <Input
          placeholder="Search Images"
          size="lg"
          pr="200px"
          aria-label="Search Images"
          ref={searchInputRef}
          value={searchQuery}
          disabled={disabled}
          onChange={handleSearchQueryChange}
          onFocus={handleSearchInputFocus}
          onBlur={handleSearchInputBlur}
        />
        <InputRightElement width="initial" right={2}>
          <HStack alignItems="center">
            <SortOrder
              value={searchParams.order}
              disabled={disabled}
              onChange={handleOrderChange}
            />
            <ToggleFilters
              isOpen={isFiltersPanelVisible}
              disabled={disabled}
              onClick={toggleFiltersPanel}
            />
          </HStack>
        </InputRightElement>
      </InputGroup>
      <FilterOptions
        disabled={disabled}
        isOpen={isFiltersPanelVisible}
        value={{
          color: searchParams.color,
          orientation: searchParams.orientation,
        }}
        onChange={handleFiltersChange}
      />
    </>
  );
};

export type SearchParams = {
  query: string;
  order: Order;
  color: Color;
  orientation: Orientation;
};

export type SearchPanelProps = {
  searchParams: SearchParams;
  disabled: boolean;
  onChange: (updaterFn: (oldValue: SearchParams) => SearchParams) => void;
};
