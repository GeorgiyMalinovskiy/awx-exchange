import express from "express";
import cors from "cors";
import type { AwxRequest, AwxResponse } from "../types";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const MOCK_RATES = {
  RUB_TO_USDT: 0.012, // 1 RUB = 0.012 USDT
  USDT_TO_RUB: 83.18, // 1 USDT = 83.18 RUB
};

app.post("/mock/api/change/user/pair/calc", (req, res) => {
  const { inAmount, outAmount } = req.body as AwxRequest;

  let response: AwxResponse;

  if (inAmount !== null) {
    // RUB -> USDT
    response = {
      inAmount,
      outAmount: Number((inAmount * MOCK_RATES.RUB_TO_USDT).toFixed(6)),
      isStraight: true,
      price: [MOCK_RATES.USDT_TO_RUB, MOCK_RATES.RUB_TO_USDT],
    };
  } else if (outAmount !== null) {
    // USDT -> RUB
    response = {
      inAmount: Number((outAmount * MOCK_RATES.USDT_TO_RUB).toFixed(2)),
      outAmount,
      isStraight: false,
      price: [MOCK_RATES.USDT_TO_RUB, MOCK_RATES.RUB_TO_USDT],
    };
  } else {
    return res.status(400).json({ error: JSON.stringify(req.body) });
  }

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Mock server at http://localhost:${PORT}`);
});
