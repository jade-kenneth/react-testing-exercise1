import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { forwardRef, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import FormContainer, { FormContainerProps } from "./form-container";

interface InputFieldProps extends UseFormRegisterReturn, FormContainerProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  chakraInputProps?: InputProps;
  onPressEnter?(): void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const {
      onChange,
      onBlur,
      name,
      onPressEnter,
      rightIcon,
      leftIcon,
      chakraInputProps,
      ...formContainerProps
    } = props;
    return (
      <FormContainer {...formContainerProps}>
        <InputGroup size={chakraInputProps?.size}>
          {leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
          <Input
            {...chakraInputProps}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            data-testid={"form.input"}
            onKeyPress={(e) => {
              if (e.key === "Enter" && onPressEnter) {
                onPressEnter();
              }
            }}
          />
          {rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
        </InputGroup>
      </FormContainer>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
