import {
  type FC,
  type MouseEventHandler,
  type InputHTMLAttributes,
} from "react";
import { useFormContext, useWatch } from "react-hook-form";

import * as s from "./Input.styled";
import type { FormValues } from "../../../types";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: keyof FormValues;
  steps?: number;
}

export const Input: FC<InputProps> = ({ name, steps = 4, ...props }) => {
  const { register, control, setValue } = useFormContext<FormValues>();
  const value = useWatch({ name, control }) ?? 1;

  const { max = 1, min = 0 } = props;
  const progress = value
    ? Math.min(Math.ceil(Number(value) / (Number(max) / 100)), 100)
    : 0;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const index = +event.currentTarget.dataset.index!;
    const percent = (100 / steps) * (index + 1);
    const value = Number(max) * (percent / 100);
    setValue(name, value, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue > Number(max)) {
      setValue(name, Number(max));
    } else if (newValue < Number(min)) {
      setValue(name, Number(min));
    }
  };

  return (
    <s.InputRoot>
      <s.InputInner>
        <s.InputInput
          data-testid={`${name}-input`}
          type="number"
          {...register(name, {
            valueAsNumber: true,
            onChange: handleChange,
          })}
          // onKeyDown={(e) => {
          //   if (/D+/g.test(e.key)) e.preventDefault();
          // }}
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
              type="button"
              data-index={index}
              data-steps={steps}
              data-progress={progress}
              data-text={`${stepProgress}%`}
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
