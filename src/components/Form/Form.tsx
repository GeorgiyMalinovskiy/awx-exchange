import type { FC, PropsWithChildren } from "react";
import * as s from "./Form.styled";

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form: FC<PropsWithChildren<FormProps>> = ({
  children,
  onSubmit,
}) => {
  return <s.Form onSubmit={onSubmit}>{children}</s.Form>;
};
