import { useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { Form, Input } from "./components";
import * as s from "./App.styled";
import { useRequest } from "./hooks";
import type { FormValues } from "./types";

function App() {
  const { handleRequest } = useRequest();

  const methods = useForm<FormValues>({
    defaultValues: async () => {
      const { data } = await handleRequest({
        pairId: 133,
        inAmount: 100,
        outAmount: null,
      });

      return {
        rub: data?.inAmount,
        usdt: data?.outAmount,
      };
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = useCallback((formData: FormValues) => {
    console.log("submit", formData);
  }, []);

  return (
    <s.Container>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input name="rub" min={10e3} max={70e6} step={100.0} />
          <Input name="usdt" step={0.000001} />
        </Form>
      </FormProvider>
    </s.Container>
  );
}

export default App;
