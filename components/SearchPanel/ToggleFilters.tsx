import { IconButton, Tooltip } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { FiFilter } from "react-icons/fi";

export const ToggleFilters = ({
  isOpen,
  disabled,
  onClick,
}: ToggleFiltersProps) => {
  return (
    <Tooltip
      label={isOpen ? "Hide Filters" : "Show Filters"}
      placement="bottom-start"
      bg="gray.200"
      color="gray.800"
      openDelay={400}
    >
      <IconButton
        variant="outline"
        aria-label={isOpen ? "Hide Filters" : "Show Filters"}
        h="2rem"
        mr={-5}
        icon={<FiFilter />}
        borderRadius="sm"
        onClick={onClick}
        disabled={disabled}
      />
    </Tooltip>
  );
};

export type ToggleFiltersProps = {
  isOpen: boolean;
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};
