import { useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { Form, Input } from "./components";
import * as s from "./App.styled";
import { useRequest } from "./hooks";
import type { FormValues } from "./types";
import { MIN_RUB, MIN_USDT } from "./constants";

function App() {
  const { handleRequest } = useRequest();

  const methods = useForm<FormValues>({
    defaultValues: async () => {
      const { data } = await handleRequest({
        pairId: 133,
        inAmount: MIN_RUB,
        outAmount: MIN_USDT,
      });

      return {
        rub: data?.inAmount,
        usdt: data?.outAmount,
      };
    },
  });

  const { handleSubmit, control } = methods;

  const onSubmit = useCallback((formData: FormValues) => {
    console.log("submit", formData);
  }, []);

  return (
    <s.Container>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input name="rub" min={10e3} max={70e6} step={100.0} />
          <Input name="usdt" min={0.000001} max={10e6} step={0.000001} />
        </Form>
        {import.meta.env.DEV && <DevTool control={control} />}
      </FormProvider>
    </s.Container>
  );
}

export default App;
