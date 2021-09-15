import { Box, Stack } from "@chakra-ui/layout";

export const Header = (props: HeaderProps) => {
  return (
    <Box
      pos="fixed"
      top={0}
      width="100%"
      zIndex={1}
      pt={{ base: 2, md: 5 }}
      pb={{ base: 2, md: 5 }}
      bg="white"
    >
      <Stack
        maxW="80rem"
        mr="auto"
        ml="auto"
        pl={{ base: 2, md: 8 }}
        pr={{ base: 2, md: 8 }}
      >
        {props.children}
      </Stack>
    </Box>
  );
};

export type HeaderProps = {
  children: React.ReactChild;
};
