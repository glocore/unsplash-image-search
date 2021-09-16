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
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Color } from "./ColorFilter";
import { FilterOptions, Orientation } from "./FilterOptions";
import { Order, SortOrder } from "./SortOrder";
import { ToggleFilters } from "./ToggleFilters";

export const SearchPanel = ({
  searchParams,
  disabled,
  onChange,
}: SearchPanelProps) => {
  const [isFiltersPanelOpen, setIsFiltersPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleFiltersPanel = () => {
    setIsFiltersPanelOpen(!isFiltersPanelOpen);
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

  const debouncedSearchQueryUpdate = debounce(
    (newValue) => onChange((oldValue) => ({ ...oldValue, query: newValue })),
    300
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

  const isSearchTermTooShort = searchQuery.length < 3;

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
              disabled={disabled || isSearchTermTooShort}
              onChange={handleOrderChange}
            />
            <ToggleFilters
              isOpen={isFiltersPanelOpen}
              disabled={disabled || isSearchTermTooShort}
              onClick={toggleFiltersPanel}
            />
          </HStack>
        </InputRightElement>
      </InputGroup>
      <FilterOptions
        disabled={disabled || isSearchTermTooShort}
        isOpen={isFiltersPanelOpen}
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
