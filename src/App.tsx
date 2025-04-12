import { useCallback, useRef, useEffect } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { Form, Input } from "./components";
import * as s from "./App.styled";
import { useRequest } from "./hooks";
import type { FormValues } from "../types";
import { MIN_RUB, MIN_USDT } from "./constants";

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const { handleRequest, isLoading } = useRequest({
    onError: (error: string) => {
      alert(error);
    },
  });

  const methods = useForm<FormValues>({
    defaultValues: async () => {
      const { data } = await handleRequest({
        pairId: 133,
        inAmount: MIN_RUB,
        outAmount: null,
      });

      return {
        rub: data?.inAmount ?? MIN_RUB,
        usdt: data?.outAmount ?? MIN_USDT,
      };
    },
  });

  const { handleSubmit, control, formState, reset } = methods;
  const { dirtyFields } = formState;

  const values = useWatch({ control });
  useEffect(() => {
    if (formRef.current && Object.keys(dirtyFields).length) {
      formRef.current.requestSubmit();
    }
  }, [values, dirtyFields]);

  const onSubmit = useCallback(
    (formData: FormValues) => {
      const requestData = async () => {
        const { rub, usdt } = formData;
        const isRubDirty = dirtyFields.rub;
        const isUsdtDirty = dirtyFields.usdt;

        if (isRubDirty || isUsdtDirty) {
          const request = {
            pairId: 133,
            inAmount: isRubDirty && rub ? rub : null,
            outAmount: isUsdtDirty && usdt ? usdt : null,
          };

          const { data } = await handleRequest(request);

          if (data) {
            reset(
              {
                rub: data.inAmount,
                usdt: data.outAmount,
              },
              {
                keepDirty: false,
              }
            );
          }
        }
      };

      requestData();
    },
    [handleRequest, reset, dirtyFields]
  );

  return (
    <s.Container>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
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
