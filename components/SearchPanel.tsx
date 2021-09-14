import {
  Box,
  Button,
  Collapse,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Tooltip,
  UseMenuOptionGroupProps,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { debounce } from "lodash-es";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiSort } from "react-icons/bi";
import { FiChevronDown, FiFilter, FiX } from "react-icons/fi";
import { Color, ColorFilter } from "./ColorFilter";

export const enum Order {
  relevance = "relevance",
  latest = "latest",
}

export const enum Orientation {
  all = "all",
  landscape = "landscape",
  portrait = "portrait",
  squarish = "squarish",
}

export { Color };

const orderLabel = {
  [Order.relevance]: "Relevance",
  [Order.latest]: "Latest",
};

const orientationLabel = {
  [Orientation.all]: "Any Orientation",
  [Orientation.landscape]: "Landscape",
  [Orientation.portrait]: "Portrait",
  [Orientation.squarish]: "Square",
};

export const SearchPanel = ({ searchParams, onChange }: SearchPanelProps) => {
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

  const handleColorChange = (newValue: Color) => {
    onChange((oldValue) => ({ ...oldValue, color: newValue as Color }));
  };

  const handleOrientationChange: UseMenuOptionGroupProps["onChange"] = (
    newValue
  ) => {
    onChange((oldValue) => ({
      ...oldValue,
      orientation: newValue as Orientation,
    }));
  };

  const clearFilters = () => {
    onChange((oldValue) => ({
      ...oldValue,
      color: Color.all,
      orientation: Orientation.all,
    }));
  };

  const filtersAreDefault =
    searchParams.color === Color.all &&
    searchParams.orientation === Orientation.all;

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
          onChange={handleSearchQueryChange}
          onFocus={handleSearchInputFocus}
          onBlur={handleSearchInputBlur}
        />
        <InputRightElement width="initial" right={2}>
          <HStack alignItems="center">
            <Menu>
              <Tooltip
                label="Order By"
                placement="bottom"
                bg="gray.200"
                color="gray.800"
                openDelay={400}
              >
                <MenuButton
                  id="sort-order-1"
                  as={Button}
                  h="2rem"
                  borderRadius="sm"
                  variant="outline"
                  leftIcon={<BiSort />}
                >
                  {orderLabel[searchParams.order]}
                </MenuButton>
              </Tooltip>

              <MenuList minWidth="240px">
                <MenuOptionGroup
                  value={searchParams.order}
                  onChange={handleOrderChange}
                  type="radio"
                >
                  <MenuItemOption value={Order.relevance}>
                    {orderLabel[Order.relevance]}
                  </MenuItemOption>
                  <MenuItemOption value={Order.latest}>
                    {orderLabel[Order.latest]}
                  </MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
            <Tooltip
              label={isFiltersPanelVisible ? "Hide Filters" : "Show Filters"}
              placement="bottom-start"
              bg="gray.200"
              color="gray.800"
              openDelay={400}
            >
              <IconButton
                variant="outline"
                aria-label={
                  isFiltersPanelVisible ? "Hide Filters" : "Show Filters"
                }
                h="2rem"
                mr={-5}
                icon={<FiFilter />}
                borderRadius="sm"
                onClick={toggleFiltersPanel}
              />
            </Tooltip>
          </HStack>
        </InputRightElement>
      </InputGroup>
      <Collapse in={isFiltersPanelVisible} animateOpacity>
        <Box p={4}>
          <Wrap spacing={8}>
            <WrapItem>
              <HStack>
                <label>Colors</label>
                <ColorFilter
                  value={searchParams.color}
                  onChange={handleColorChange}
                />
              </HStack>
            </WrapItem>

            <WrapItem>
              <Menu>
                <Tooltip
                  label="Orientation"
                  placement="bottom"
                  bg="gray.200"
                  color="gray.800"
                  openDelay={400}
                >
                  <MenuButton
                    id="orientation-1"
                    as={Button}
                    borderRadius="sm"
                    variant="outline"
                    rightIcon={<FiChevronDown />}
                    minWidth="176px"
                  >
                    {orientationLabel[searchParams.orientation]}
                  </MenuButton>
                </Tooltip>

                <MenuList minWidth="240px">
                  <MenuOptionGroup
                    value={searchParams.orientation}
                    onChange={handleOrientationChange}
                    type="radio"
                  >
                    <MenuItemOption value={Orientation.all}>
                      {orientationLabel[Orientation.all]}
                    </MenuItemOption>
                    <MenuItemOption value={Orientation.landscape}>
                      {orientationLabel[Orientation.landscape]}
                    </MenuItemOption>
                    <MenuItemOption value={Orientation.portrait}>
                      {orientationLabel[Orientation.portrait]}
                    </MenuItemOption>
                    <MenuItemOption value={Orientation.squarish}>
                      {orientationLabel[Orientation.squarish]}
                    </MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </WrapItem>

            <WrapItem>
              <Button
                onClick={clearFilters}
                variant="ghost"
                disabled={filtersAreDefault}
                color="gray.600"
                leftIcon={<FiX />}
              >
                Clear Filters
              </Button>
            </WrapItem>
          </Wrap>
        </Box>
      </Collapse>
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
  onChange: (updaterFn: (oldValue: SearchParams) => SearchParams) => void;
};
