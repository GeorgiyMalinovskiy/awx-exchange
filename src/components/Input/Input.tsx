import {
  type FC,
  type MouseEventHandler,
  type InputHTMLAttributes,
  useEffect,
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
  const value = useWatch({ name, control });

  // const { min = 0 } = props;
  // useEffect(() => {
  //   console.log("value", value);
  //   if (!value) {
  //     setValue(name, Number(min));
  //   }
  // }, [value, min, name, setValue]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const { max = 1 } = props;
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
        <s.InputValue>{value}</s.InputValue>
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
