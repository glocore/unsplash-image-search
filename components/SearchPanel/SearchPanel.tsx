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
  Stack,
  Tooltip,
  UseMenuOptionGroupProps,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
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

export const enum Ordering {
  relevance = "relevance",
  latest = "latest",
}

const orderingLabel = {
  [Ordering.relevance]: "Relevance",
  [Ordering.latest]: "Latest",
};

export const enum Orientation {
  all = "all",
  landscape = "landscape",
  portrait = "portrait",
  squarish = "squarish",
}

const orientationLabel = {
  [Orientation.all]: "Any Orientation",
  [Orientation.landscape]: "Landscape",
  [Orientation.portrait]: "Portrait",
  [Orientation.squarish]: "Square",
};

export const SearchPanel = (props: SearchPanelProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersPanelVisible, setIsFiltersPanelVisible] = useState(false);
  const [selectedOrdering, setSelectedOrdering] = useState(Ordering.relevance);
  const [selectedColor, setSelectedColor] = useState(Color.all);
  const [selectedOrientation, setSelectedOrientation] = useState(
    Orientation.all
  );
  const [areFiltersPristine, setAreFiltersPristine] = useState(true);

  const handleSearchQueryChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setSearchQuery(event.target.value);
  };

  const toggleFiltersPanel = () => {
    setIsFiltersPanelVisible(!isFiltersPanelVisible);
  };

  const handleOrderingSelection: UseMenuOptionGroupProps["onChange"] = (
    value
  ) => {
    setSelectedOrdering(value as Ordering);
  };

  const handleColorSelection = (newValue: Color) => {
    setSelectedColor(newValue);
    setAreFiltersPristine(false);
  };

  const handleOrientationSelection: UseMenuOptionGroupProps["onChange"] = (
    value
  ) => {
    setSelectedOrientation(value as Orientation);
    setAreFiltersPristine(false);
  };

  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    console.log({ query });
    setSearchQuery((query as string) || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    router.push(
      {
        query: {
          query: searchQuery,
          order: selectedOrdering,
          orientation: selectedOrientation,
          color: selectedColor,
        },
      },
      undefined,
      { shallow: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedColor, selectedOrdering, selectedOrientation]);

  const clearFilters = () => {
    setSelectedColor(Color.all);
    setSelectedOrientation(Orientation.all);
    setAreFiltersPristine(true);
  };

  const searchInputRef = useRef<HTMLInputElement>(null);

  const hotkeyListener = useCallback((e: KeyboardEvent) => {
    if (e.key === "/") {
      e.preventDefault();
      searchInputRef?.current?.focus();
      window.removeEventListener("keypress", hotkeyListener);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keypress", hotkeyListener);
    return () => window.removeEventListener("keypress", hotkeyListener);
  }, [hotkeyListener]);

  const handleSearchInputFocus = () => {
    window.removeEventListener("keypress", hotkeyListener);
  };

  const handleSearchInputBlur = () => {
    window.addEventListener("keypress", hotkeyListener);
  };

  return (
    <Box
      pos="fixed"
      top={0}
      width="100%"
      zIndex={1}
      pt={2}
      pb={2}
      pl={{ base: 2, md: 8 }}
      pr={{ base: 2, md: 8 }}
      bg="white"
    >
      <Stack maxW="80rem" mr="auto" ml="auto">
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
                    {orderingLabel[selectedOrdering]}
                  </MenuButton>
                </Tooltip>

                <MenuList minWidth="240px">
                  <MenuOptionGroup
                    value={selectedOrdering}
                    onChange={handleOrderingSelection}
                    type="radio"
                  >
                    <MenuItemOption value={Ordering.relevance}>
                      {orderingLabel[Ordering.relevance]}
                    </MenuItemOption>
                    <MenuItemOption value={Ordering.latest}>
                      {orderingLabel[Ordering.latest]}
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
                    value={selectedColor}
                    onChange={handleColorSelection}
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
                      {orientationLabel[selectedOrientation]}
                    </MenuButton>
                  </Tooltip>

                  <MenuList minWidth="240px">
                    <MenuOptionGroup
                      value={selectedOrientation}
                      onChange={handleOrientationSelection}
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
                  disabled={areFiltersPristine}
                  color="gray.600"
                  leftIcon={<FiX />}
                >
                  Clear Filters
                </Button>
              </WrapItem>
            </Wrap>
          </Box>
        </Collapse>
      </Stack>
    </Box>
  );
};

export type SearchPanelProps = {
  // onChange: (data: {
  //   searchQuery: string;
  //   sortOrder: ordering;
  //   color: color;
  //   orientation: orientation;
  // }) => void;
};
