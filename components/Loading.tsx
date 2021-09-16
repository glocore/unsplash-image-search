import { Box, BoxProps, CircularProgress } from "@chakra-ui/react";

export const Loading = (props: LoadingProps) => {
  return (
    <Box
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <CircularProgress isIndeterminate />
    </Box>
  );
};

export type LoadingProps = BoxProps;
