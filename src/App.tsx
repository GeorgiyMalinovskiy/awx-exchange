import { useCallback, useRef, useEffect, useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { Form, Input } from "./components";
import * as s from "./App.styled";
import { useRequest } from "./hooks";
import type { FormValues, AwxResponse } from "../types";
import {
  RUB_MIN,
  RUB_MAX,
  RUB_STEP,
  USDT_MIN,
  USDT_MAX,
  USDT_STEP,
} from "./constants";

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const [usdtLimits, setUsdtLimits] = useState({
    min: USDT_MIN,
    max: USDT_MAX,
  });

  const { handleRequest, isLoading } = useRequest({
    onSuccess: (data: AwxResponse) => {
      const [, rubToUsdt] = data.price;
      setUsdtLimits({
        min: Number((RUB_MIN * rubToUsdt).toFixed(6)),
        max: Number((RUB_MAX * rubToUsdt).toFixed(6)),
      });
    },
    onError: (error: string) => {
      alert(error);
    },
  });

  const methods = useForm<FormValues>({
    shouldUseNativeValidation: false,
    defaultValues: async () => {
      const { data } = await handleRequest({
        pairId: 133,
        inAmount: RUB_MIN,
        outAmount: null,
      });

      return {
        rub: data?.inAmount ?? RUB_MIN,
        usdt: data?.outAmount ?? USDT_MIN,
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
            min={RUB_MIN}
            max={RUB_MAX}
            step={RUB_STEP}
            disabled={isLoading}
          />
          <Input
            name="usdt"
            min={usdtLimits.min}
            max={usdtLimits.max}
            step={USDT_STEP}
            disabled={isLoading}
          />
        </Form>
        {import.meta.env.DEV && <DevTool control={control} />}
      </FormProvider>
    </s.Container>
  );
}

export default App;
