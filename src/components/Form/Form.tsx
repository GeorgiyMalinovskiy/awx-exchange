import { type PropsWithChildren, forwardRef } from "react";
import * as s from "./Form.styled";

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = forwardRef<HTMLFormElement, PropsWithChildren<FormProps>>(
  ({ children, onSubmit }, ref) => {
    return (
      <s.Form noValidate onSubmit={onSubmit} ref={ref}>
        {children}
      </s.Form>
    );
  }
);
