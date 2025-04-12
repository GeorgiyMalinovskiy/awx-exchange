import { useState } from "react";
import type { AwxResponse, AwxRequest } from "../types";
import { debounce } from "../utils";

interface RequestResult {
  data: AwxResponse | null;
  error?: string | null;
}

const API_URL = import.meta.env.DEV
  ? "http://localhost:3001/mock/api/change/user/pair/calc"
  : "https://awx.pro/b2api/change/user/pair/calc"; // TODO: нужно прописать cors-ы на сервере

export const useRequest = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<AwxResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async (request: AwxRequest): Promise<RequestResult> => {
    setIsLoading(true);

    try {
      const data: AwxResponse = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          serial: "a7307e89-fbeb-4b28-a8ce-55b7fb3c32aa",
        },
        body: JSON.stringify(request),
      }).then((res) => res.json());

      setData(data);
      return { data };
    } catch (error) {
      console.warn(error);
      const errorMessage = `Ошибка: ${error}`;
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    data,
    error,
    handleRequest: debounce(handleRequest, 1200),
  };
};
