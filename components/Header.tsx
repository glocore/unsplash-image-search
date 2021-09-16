import { Box, BoxProps, Stack } from "@chakra-ui/layout";
import { forwardRef } from "@chakra-ui/system";
import { PropsWithChildren, useEffect, useState } from "react";

export const Header = forwardRef(({ children, float }: HeaderProps, ref) => {
  return (
    <Box
      as="header"
      top={0}
      width="100%"
      zIndex={1}
      pt={{ base: 2, md: 5 }}
      pb={{ base: 2, md: 5 }}
      bg="white"
      pos={float ? "fixed" : "initial"}
      shadow={float ? "md" : undefined}
      ref={ref}
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

export type HeaderProps = BoxProps &
  PropsWithChildren<{
    float: boolean;
  }>;

export const useHeader = () => {
  const [isHeaderFloating, setIsHeaderFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        if (isHeaderFloating) {
          // do nothing
        } else {
          setIsHeaderFloating(true);
        }
      } else {
        setIsHeaderFloating(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isHeaderFloating };
};
