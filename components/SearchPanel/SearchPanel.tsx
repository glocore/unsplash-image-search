import {
  Input,
  InputGroup,
  Stack,
  HStack,
  Select,
  InputRightElement,
  Tooltip,
  IconButton,
  Collapse,
  Box,
  Button,
} from "@chakra-ui/react";
import { ChangeEventHandler, useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { BiSort } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import { ColorFilter, color } from "./ColorFilter";

const enum ordering {
  relevance,
  latest,
}
const enum orientation {
  any,
  landscape,
  portrait,
  squarish,
}

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

  const handleOrderingSelection: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setSelectedOrdering(event.target.value as unknown as ordering);
  };

  const handleColorSelection = (newValue: color) => {
    setSelectedColor(newValue);
    setAreFiltersPristine(false);
  };

  const handleOrientationSelection: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setSelectedOrientation(event.target.value as unknown as orientation);
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

  return (
    <Stack>
      <InputGroup size="lg">
        <Input
          placeholder="Search Images"
          size="lg"
          aria-label="Search Images"
          onChange={handleSearchQueryChange}
        />
        <InputRightElement w="initial" right={2}>
          <HStack>
            <Tooltip
              label="Order By"
              placement="bottom"
              bg="gray.200"
              color="gray.800"
            >
              <Select
                h="2rem"
                borderRadius="sm"
                iconColor="gray.600"
                cursor="pointer"
                icon={<BiSort />}
                value={selectedOrdering}
                onChange={handleOrderingSelection}
                aria-label="Sort Order"
              >
                <option value={ordering.relevance}>Relevance</option>
                <option value={ordering.latest}>Latest</option>
              </Select>
            </Tooltip>
            <Tooltip
              label={isFiltersPanelVisible ? "Hide Filters" : "Show Filters"}
              placement="bottom-start"
              bg="gray.200"
              color="gray.800"
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
        <Box p={4} borderWidth="1px" borderRadius="md">
          <HStack spacing={8}>
            <HStack>
              <label>Colors</label>
              <ColorFilter
                value={selectedColor}
                onChange={handleColorSelection}
              />
            </HStack>
            <Tooltip
              label="Orientation"
              placement="bottom"
              bg="gray.200"
              color="gray.800"
            >
              <Select
                borderRadius="sm"
                iconColor="gray.600"
                cursor="pointer"
                width="initial"
                value={selectedOrientation}
                onChange={handleOrientationSelection}
                aria-label="Orientation"
              >
                <option value={orientation.any}>Any Orientation</option>
                <option value={orientation.landscape}>Landscape</option>
                <option value={orientation.portrait}>Portrait</option>
                <option value={orientation.squarish}>Square</option>
              </Select>
            </Tooltip>
            <Button
              onClick={clearFilters}
              variant="ghost"
              disabled={areFiltersPristine}
              color="gray.600"
              leftIcon={<FiX />}
            >
              Clear Filters
            </Button>
          </HStack>
        </Box>
      </Collapse>
    </Stack>
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
