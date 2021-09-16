import { Button, ButtonProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const SkipToContent = ({ children, ...rest }: SkipToContentProps) => {
  return (
    <Button
      tabIndex={0}
      position="absolute"
      transform="translateY(-150%)"
      p={4}
      left={4}
      top={4}
      bgColor="white"
      borderColor="blue.500"
      borderWidth="2px"
      borderStyle="solid"
      borderRadius={8}
      transition="transform 0.1s"
      zIndex={5}
      _focus={{
        transform: `translateY(0%)`,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export type SkipToContentProps = PropsWithChildren<ButtonProps>;
