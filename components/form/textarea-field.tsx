import {
  Select,
  SelectProps,
  SelectField as ChakraSelectField,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { forwardRef, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import FormContainer, { FormContainerProps } from "./form-container";

interface TextareaFieldProps extends UseFormRegisterReturn, FormContainerProps {
  chakraInputProps?: TextareaProps;
  onPressEnter?(): void;
}

const SelectField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  (props, ref) => {
    const {
      onChange,
      onBlur,
      name,
      onPressEnter,

      chakraInputProps,
      ...formContainerProps
    } = props;
    return (
      <FormContainer {...formContainerProps}>
        <Textarea
          {...chakraInputProps}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          width={"100%"}
          data-testid={"form.textarea"}
          name={name}
          onKeyPress={(e) => {
            if (e.key === "Enter" && onPressEnter) {
              onPressEnter();
            }
          }}
        ></Textarea>
      </FormContainer>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
