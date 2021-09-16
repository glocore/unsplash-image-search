import {
  Box,
  Button,
  Collapse,
  HStack,
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
import React from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import { Color, ColorFilter } from "./ColorFilter";

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

export type FilterOptions = {
  color: Color;
  orientation: Orientation;
};

export const FilterOptions = ({
  value,
  isOpen,
  disabled,
  onChange,
}: FilterOptionsProps) => {
  const handleColorChange = (newValue: Color) => {
    onChange((oldValue) => ({ ...oldValue, color: newValue }));
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
    onChange(() => ({
      color: Color.all,
      orientation: Orientation.all,
    }));
  };

  const filtersAreDefault =
    value.color === Color.all && value.orientation === Orientation.all;

  return (
    <Collapse in={isOpen} animateOpacity>
      <Box p={4}>
        <Wrap spacing={8}>
          <WrapItem>
            <HStack>
              <label style={{ color: disabled ? "#AAA" : undefined }}>
                Colors
              </label>
              <ColorFilter
                value={value.color}
                onChange={handleColorChange}
                disabled={disabled}
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
                  id="orientation"
                  as={Button}
                  borderRadius="sm"
                  variant="outline"
                  rightIcon={<FiChevronDown />}
                  minWidth="176px"
                  disabled={disabled}
                >
                  {orientationLabel[value.orientation]}
                </MenuButton>
              </Tooltip>

              <MenuList minWidth="240px">
                <MenuOptionGroup
                  value={value.orientation}
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
              disabled={filtersAreDefault || disabled}
              color="gray.600"
              leftIcon={<FiX />}
            >
              Clear Filters
            </Button>
          </WrapItem>
        </Wrap>
      </Box>
    </Collapse>
  );
};

export type FilterOptionsProps = {
  isOpen: boolean;
  value: FilterOptions;
  disabled: boolean;
  onChange: (updaterFn: (oldValue: FilterOptions) => FilterOptions) => void;
};
