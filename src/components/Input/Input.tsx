import type { FC, MouseEventHandler, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

import * as s from "./Input.styled";
import type { FormValues } from "../../types";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: keyof FormValues;
  steps?: number;
}

export const Input: FC<InputProps> = ({ name, steps = 4, ...props }) => {
  const { register } = useFormContext<FormValues>();
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log(event.currentTarget.dataset.index);
  };

  return (
    <s.InputRoot>
      <s.InputInner>
        <s.InputInput type="number" {...register(name)} {...props} />
        <s.InputValue />
        <s.InputText>{name.toUpperCase()}</s.InputText>
      </s.InputInner>
      <s.InputProgress>
        {Array.from({ length: steps }).map((...args) => {
          const [, index] = args;
          return (
            <s.InputProgressButton
              key={index}
              data-index={index}
              data-total={steps}
              onClick={handleClick}
            >
              <span>{(100 / steps) * (index + 1)}%</span>
            </s.InputProgressButton>
          );
        })}
      </s.InputProgress>
    </s.InputRoot>
  );
};
