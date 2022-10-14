import {Circle, HStack, StackProps, Text} from '@chakra-ui/react';

type WithoutChildren<T extends {}> = Omit<T, 'children'>;

interface LabelProps {
  label?: string;
  required?: boolean;
  containerProps?: WithoutChildren<StackProps>;
}

const FieldLabel = ({label, required, containerProps, ...props}: LabelProps) => {
  return (
    <HStack {...containerProps}>
      <Text as="label" fontSize="sm" color="Gray.600" fontWeight="medium" {...props}>
        {label}
      </Text>

      {required && <Circle bg="red" mt="2.5px !important" size="5px" />}
    </HStack>
  );
};

export default FieldLabel;
