import { Box, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import Image from "next/image";

export const NoResultsFound = (props: NoResultsFoundProps) => {
  return (
    <Box
      w="100%"
      pl={{ base: 2, md: 8 }}
      pr={{ base: 2, md: 8 }}
      pt={150}
      animation="fadeIn 0.5s"
      css={css`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}
    >
      <Box
        w="100%"
        maxW="50rem"
        h="70vh"
        minH="30rem"
        mr="auto"
        ml="auto"
        position="relative"
      >
        <Text fontSize="xl" textAlign="center">
          No Results Found
        </Text>
        <Text textAlign="center" color="gray.500">
          Maybe try another search term?
        </Text>
        <Image src="/not_found.svg" alt="No results found" layout="fill" />
      </Box>
    </Box>
  );
};

export type NoResultsFoundProps = {};
