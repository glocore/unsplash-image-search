import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Tooltip,
  UseMenuOptionGroupProps,
} from "@chakra-ui/react";
import React from "react";
import { BiSort } from "react-icons/bi";

export const enum Order {
  relevance = "relevance",
  latest = "latest",
}

const orderLabel = {
  [Order.relevance]: "Relevance",
  [Order.latest]: "Latest",
};

export const SortOrder = ({ value, disabled, onChange }: SortOrderProps) => {
  const _window = process.browser ? window : { innerWidth: 0 };
  const shouldShowButtonLabel = _window.innerWidth > 480;

  return (
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
          disabled={disabled}
          leftIcon={<BiSort />}
          name={"Order By"}
          label={`Order by: ${orderLabel[value]}`}
          aria-label={`Order by: ${orderLabel[value]}`}
        >
          {shouldShowButtonLabel && orderLabel[value]}
        </MenuButton>
      </Tooltip>

      <MenuList minWidth="240px">
        <MenuOptionGroup value={value} onChange={onChange} type="radio">
          <MenuItemOption value={Order.relevance}>
            {orderLabel[Order.relevance]}
          </MenuItemOption>
          <MenuItemOption value={Order.latest}>
            {orderLabel[Order.latest]}
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export type SortOrderProps = {
  disabled: boolean;
  value: Order;
  onChange: UseMenuOptionGroupProps["onChange"];
};
