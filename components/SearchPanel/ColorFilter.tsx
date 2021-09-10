import {
  useRadio,
  useRadioGroup,
  Tooltip,
  Box,
  HStack,
  UseRadioProps,
} from "@chakra-ui/react";
import React, { ReactChild, useState } from "react";

export const enum color {
  all = "all",
  blackAndWhite = "black_and_white",
}
const options = [color.all, color.blackAndWhite];

const RadioCard = (props: UseRadioProps & { children: ReactChild }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const [isFocused, setIsFocused] = useState(false);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Tooltip
      placement="bottom"
      label={
        {
          [color.all]: "Any Color",
          [color.blackAndWhite]: "Black and White",
        }[props.value as color]
      }
      bg="gray.200"
      color="gray.800"
      isOpen={isFocused}
      openDelay={400}
    >
      <Box
        as="label"
        onFocus={() => setIsFocused(true)}
        onMouseOver={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseLeave={() => setIsFocused(false)}
      >
        <>
          <input {...input} />
          <Box
            {...checkbox}
            cursor="pointer"
            borderWidth="3px"
            borderRadius="50%"
            w={10}
            h={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
            _checked={{
              borderColor: "teal.600",
            }}
            _focus={{
              boxShadow: "outline",
            }}
          >
            <Box
              bg={
                {
                  [color.all]:
                    "linear-gradient(-135deg, #f8ff00 0%, #3ad59f 100%)",
                  [color.blackAndWhite]:
                    "linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(120,120,120,1) 50%, rgba(255,255,255,1) 100%)",
                }[props.value as color]
              }
              h={7}
              w={7}
              borderRadius="50%"
            />
          </Box>
        </>
      </Box>
    </Tooltip>
  );
};

export const ColorFilter = ({ value, onChange }: ColorFilterProps) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: options[0],
    onChange: (newValue) => onChange(newValue as color),
    value,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
};

export type ColorFilterProps = {
  value: color;
  onChange: (newValue: color) => void;
};
