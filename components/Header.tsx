import { Box, BoxProps, Stack } from "@chakra-ui/layout";
import { forwardRef } from "@chakra-ui/system";

export const Header = forwardRef(({ children, ...rest }: HeaderProps, ref) => {
  return (
    <Box
      as="header"
      top={0}
      width="100%"
      zIndex={1}
      pt={{ base: 2, md: 5 }}
      pb={{ base: 2, md: 5 }}
      bg="white"
      ref={ref}
      {...rest}
    >
      <Stack
        maxW="80rem"
        mr="auto"
        ml="auto"
        pl={{ base: 2, md: 8 }}
        pr={{ base: 2, md: 8 }}
      >
        {children}
      </Stack>
    </Box>
  );
});

export type HeaderProps = BoxProps & {
  children: React.ReactChild;
};
