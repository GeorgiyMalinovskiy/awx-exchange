import { useCallback, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { Form, Input } from "./components";
import * as s from "./App.styled";
import { useRequest } from "./hooks";
import type { FormValues } from "./types";
import { MIN_RUB, MIN_USDT } from "./constants";

function App() {
  const { handleRequest, isLoading } = useRequest();

  const prevValues = useRef<{
    [key in keyof FormValues]: FormValues[key] | null;
  }>({
    rub: null,
    usdt: null,
  });

  const methods = useForm<FormValues>({
    defaultValues: async () => {
      const { data } = await handleRequest({
        pairId: 133,
        inAmount: MIN_RUB,
        outAmount: null,
      });

      prevValues.current = {
        rub: data?.inAmount ?? MIN_RUB,
        usdt: data?.outAmount ?? MIN_USDT,
      };

      return {
        rub: data?.inAmount ?? MIN_RUB,
        usdt: data?.outAmount ?? MIN_USDT,
      };
    },
  });

  const { handleSubmit, control, setValue } = methods;

  const onSubmit = useCallback(
    (formData: FormValues) => {
      const requestData = async () => {
        const { rub, usdt } = formData;
        if (
          (rub || usdt) &&
          (prevValues?.current?.rub || prevValues?.current?.usdt)
        ) {
          const { data } = await handleRequest({
            pairId: 133,
            inAmount: rub && prevValues.current.rub !== rub ? rub : null,
            outAmount: usdt && prevValues.current.usdt !== usdt ? usdt : null,
          });

          prevValues.current = {
            rub: data?.inAmount ?? MIN_RUB,
            usdt: data?.outAmount ?? MIN_USDT,
          };

          if (data) {
            setValue("rub", data.inAmount, { shouldValidate: true });
            setValue("usdt", data.outAmount, { shouldValidate: true });
          }
        }
      };

      requestData();
    },
    [handleRequest, setValue]
  );

  return (
    <s.Container>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="rub"
            min={10e3}
            max={70e6}
            step={100.0}
            disabled={isLoading}
          />
          <Input
            name="usdt"
            min={0.000001}
            max={10e6}
            step={0.000001}
            disabled={isLoading}
          />
        </Form>
        {import.meta.env.DEV && <DevTool control={control} />}
      </FormProvider>
    </s.Container>
  );
}

export default App;
