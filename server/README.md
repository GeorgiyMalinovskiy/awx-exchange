# Mock Server

## Setup

1. Install:

```bash
npm install
```

2. Start:

```bash
npm start
```

With nodemon:

```bash
npm run dev
```

Api host: http://localhost:3001

## API Endpoint

POST `/mock/api/change/user/pair/calc`

### Headers

- `Content-Type: application/json`
- `serial: a7307e89-fbeb-4b28-a8ce-55b7fb3c32aa`

### Request Body

```typescript
{
  pairId: 133,
  inAmount: number | null,  // RUB -> USDT
  outAmount: number | null  // USDT -> RUB
}
```

### Response

```typescript
{
  inAmount: number,    // RUB
  outAmount: number,   // USDT
  isStraight: boolean, // true RUB -> USDT, false USDT -> RUB
  price: number[]      // [RUB/USDT rate, USDT/RUB rate]
}
```

## Mock Exchange Rates

- 1 RUB = 0.012 USDT
- 1 USDT = 83.18 RUB
