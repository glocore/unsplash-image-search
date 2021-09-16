import { Box, BoxProps, IconButton, Text } from "@chakra-ui/react";
import { IoRefreshOutline } from "react-icons/io5";

export const ErrorNotice = ({ onRetryClick, ...rest }: ErrorProps) => {
  return (
    <Box
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      {...rest}
    >
      <Text fontSize="xl" color="gray.500" mb={4}>
        Something went wrong, try again?
      </Text>
      <IconButton
        icon={<IoRefreshOutline />}
        aria-label="Reload"
        borderRadius="50%"
        onClick={onRetryClick}
      />
    </Box>
  );
};

export type ErrorProps = BoxProps & {
  onRetryClick: () => void;
};
