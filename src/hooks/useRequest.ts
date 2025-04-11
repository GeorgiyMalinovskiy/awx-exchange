import { useState } from "react";
import type { AwxResponse, AwxRequest } from "../types";
import { MIN_RUB, MIN_USDT } from "../constants";

interface UseRequestOptions {
  request?: AwxRequest;
}

export const useRequest = (options: UseRequestOptions = {}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<AwxResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async (request: AwxRequest) => {
    setIsLoading(true);

    try {
      //   const data: AwxResponse = await fetch(
      //     "https://awx.pro/b2api/change/user/pair/calc",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //         serial: "a7307e89-fbeb-4b28-a8ce-55b7fb3c32aa",
      //       },
      //       body: JSON.stringify(request),
      //     }
      //   ).then((res) => res.json());
      const data = {
        inAmount: (request?.inAmount ?? MIN_RUB) + 10,
        outAmount: (request?.outAmount ?? MIN_USDT) + 10,
        isStraight: true,
        price: [10, 10],
      };
      setData(data);

      return { data };
    } catch (error) {
      console.warn(error);
      setError(`Ошибка: ${error}`);
    } finally {
      setIsLoading(false);
    }

    if (options.request) {
      handleRequest(options.request);
    }

    return {
      isLoading,
      data,
      error,
    };
  };

  return {
    isLoading,
    data,
    error,
    handleRequest,
  };
};
