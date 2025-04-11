import {
  type FC,
  type MouseEventHandler,
  type InputHTMLAttributes,
} from "react";
import { useFormContext, useWatch } from "react-hook-form";

import * as s from "./Input.styled";
import type { FormValues } from "../../types";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: keyof FormValues;
  steps?: number;
}

export const Input: FC<InputProps> = ({ name, steps = 4, ...props }) => {
  const { register, control, setValue } = useFormContext<FormValues>();
  const value = useWatch({ name, control }) ?? 1;

  const { max = 1, min = 0 } = props;
  const progress = Math.min(
    Math.ceil(Number(value) / (Number(max) / 100)),
    100
  );

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const index = +event.currentTarget.dataset.index!;
    const percent = (100 / steps) * (index + 1);
    const value = Number(max) * (percent / 100);
    setValue(name, value);
  };

  return (
    <s.InputRoot>
      <s.InputInner>
        <s.InputInput
          type="number"
          {...register(name, { valueAsNumber: true })}
          {...props}
        />
        <s.InputValue>{value ? value : 0}</s.InputValue>
        <s.InputText>{name.toUpperCase()}</s.InputText>
      </s.InputInner>
      <s.InputProgress>
        {Array.from({ length: steps }).map((...args) => {
          const [, index] = args;
          const stepProgress = (100 / steps) * (index + 1);
          return (
            <s.InputProgressButton
              key={index}
              data-index={index}
              data-steps={steps}
              data-progress={progress}
              onClick={handleClick}
            >
              <span>{stepProgress}%</span>
            </s.InputProgressButton>
          );
        })}
      </s.InputProgress>
    </s.InputRoot>
  );
};
