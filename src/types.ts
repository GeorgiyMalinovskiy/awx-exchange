export type FormValues = Partial<{
  rub: number;
  usdt: number;
}>;

export interface AwxRequest {
  pairId: 133; //хардкод
  inAmount: number | null; //отдаваемое кол-во (если рассчитываем слева направо)
  outAmount: number | null; //получаемое кол-во (если рассчитываем справа налево)
}

export interface AwxResponse {
  inAmount: number; //отдаваемое кол-во
  outAmount: number; //получаемое кол-во
  isStraight: boolean; //признак прямого расчёта
  price: number[]; //цены, прямая и обратная
}
