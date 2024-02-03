export const COINBASE_API_URL =
  "https://api.coinbase.com/v2/exchange-rates?currency=ETH";

export const statusCodes = {
  Ok: 200,
  Accepted: 202,
  InternalServerError: 500,
};

const utils = {
  COINBASE_API_URL,
  statusCodes,
};

export default utils;
