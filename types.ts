export interface AwxRequest {
  pairId: number;
  inAmount: number | null;
  outAmount: number | null;
}

export interface AwxResponse {
  inAmount: number;
  outAmount: number;
  isStraight: boolean;
  price: number[];
}

export type FormValues = Partial<{
  rub: number;
  usdt: number;
}>;
