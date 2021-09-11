import {
  Input,
  InputGroup,
  Stack,
  HStack,
  InputRightElement,
  InputLeftElement,
  Tooltip,
  IconButton,
  Collapse,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  UseMenuOptionGroupProps,
  Wrap,
  WrapItem,
  Kbd,
} from "@chakra-ui/react";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FiFilter } from "react-icons/fi";
import { BiSort } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { ColorFilter, color } from "./ColorFilter";

export const enum ordering {
  relevance = "relevance",
  latest = "latest",
}

const orderingLabel = {
  [ordering.relevance]: "Relevance",
  [ordering.latest]: "Latest",
};

export const enum orientation {
  any = "any",
  landscape = "landscape",
  portrait = "portrait",
  squarish = "squarish",
}

const orientationLabel = {
  [orientation.any]: "Any Orientation",
  [orientation.landscape]: "Landscape",
  [orientation.portrait]: "Portrait",
  [orientation.squarish]: "Square",
};

export const SearchPanel = ({ onChange }: SearchPanelProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersPanelVisible, setIsFiltersPanelVisible] = useState(true);
  const [selectedOrdering, setSelectedOrdering] = useState(ordering.relevance);
  const [selectedColor, setSelectedColor] = useState(color.all);
  const [selectedOrientation, setSelectedOrientation] = useState(
    orientation.any
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
    setSelectedOrdering(value as ordering);
  };

  const handleColorSelection = (newValue: color) => {
    setSelectedColor(newValue);
    setAreFiltersPristine(false);
  };

  const handleOrientationSelection: UseMenuOptionGroupProps["onChange"] = (
    value
  ) => {
    setSelectedOrientation(value as orientation);
    setAreFiltersPristine(false);
  };

  useEffect(() => {
    onChange({
      searchQuery,
      sortOrder: selectedOrdering,
      color: selectedColor,
      orientation: selectedOrientation,
    });
  }, [
    onChange,
    searchQuery,
    selectedColor,
    selectedOrdering,
    selectedOrientation,
  ]);

  const clearFilters = () => {
    setSelectedColor(color.all);
    setSelectedOrientation(orientation.any);
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
                    <MenuItemOption value={ordering.relevance}>
                      {orderingLabel[ordering.relevance]}
                    </MenuItemOption>
                    <MenuItemOption value={ordering.latest}>
                      {orderingLabel[ordering.latest]}
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
                      <MenuItemOption value={orientation.any}>
                        {orientationLabel[orientation.any]}
                      </MenuItemOption>
                      <MenuItemOption value={orientation.landscape}>
                        {orientationLabel[orientation.landscape]}
                      </MenuItemOption>
                      <MenuItemOption value={orientation.portrait}>
                        {orientationLabel[orientation.portrait]}
                      </MenuItemOption>
                      <MenuItemOption value={orientation.squarish}>
                        {orientationLabel[orientation.squarish]}
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
  onChange: (data: {
    searchQuery: string;
    sortOrder: ordering;
    color: color;
    orientation: orientation;
  }) => void;
};
