import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import * as React from "react";
import FieldLabel from "./field-label";

export interface FormContainerProps {
  id: string;
  label?: string;
  errorMsg?: string;
  helperMsg?: string;
  formControlProps?: FormControlProps;
  isReadOnly?: boolean;
  required?: boolean;
  errorPosition?: "top" | "bottom";
}

const FormContainer = ({
  id,
  label,
  errorMsg,
  helperMsg,
  formControlProps,
  children,
  required,
  isReadOnly,
  errorPosition = "bottom",
}: React.PropsWithChildren<FormContainerProps>) => {
  return (
    <FormControl
      id={id}
      isInvalid={Boolean(errorMsg)}
      isReadOnly={isReadOnly}
      {...formControlProps}
    >
      {errorPosition === "top" && (
        <FormErrorMessage
          mb={2}
          data-testid="formcontainer.error"
          aria-label={`error.${id}`}
          role="alert"
        >
          {errorMsg}
        </FormErrorMessage>
      )}
      {label && (
        <FieldLabel
          label={label}
          required={required}
          containerProps={{ marginBottom: 2 }}
        />
      )}
      {children}
      {errorPosition === "bottom" && (
        <FormErrorMessage
          data-testid="formcontainer.error"
          aria-label={`error.${id}`}
          role="alert"
        >
          {errorMsg}
        </FormErrorMessage>
      )}
      {helperMsg && <FormHelperText>{helperMsg}</FormHelperText>}
    </FormControl>
  );
};

export default FormContainer;
