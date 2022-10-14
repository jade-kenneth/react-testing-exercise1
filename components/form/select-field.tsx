import {
  Select,
  SelectProps,
  SelectField as ChakraSelectField,
} from "@chakra-ui/react";
import { forwardRef, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import FormContainer, { FormContainerProps } from "./form-container";

interface SelectFieldProps extends UseFormRegisterReturn, FormContainerProps {
  chakraInputProps?: SelectProps;
  onPressEnter?(): void;
  options: Array<string>;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (props, ref) => {
    const {
      onChange,
      onBlur,
      name,
      onPressEnter,
      options,
      chakraInputProps,
      ...formContainerProps
    } = props;
    return (
      <FormContainer {...formContainerProps}>
        <Select
          {...chakraInputProps}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          width={"100%"}
          data-testid={"form.select"}
          border={"1px solid red"}
          name={name}
          onKeyPress={(e) => {
            if (e.key === "Enter" && onPressEnter) {
              onPressEnter();
            }
          }}
        >
          {options.map((option, idx) => (
            <option key={idx}>{option}</option>
          ))}
        </Select>
      </FormContainer>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
