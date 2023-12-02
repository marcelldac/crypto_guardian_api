import * as express from "express";

const COINBASE_API_URL =
  "https://api.coinbase.com/v2/exchange-rates?currency=ETH";

//#region Create Transaction

export const create = async (
  request: express.Request,
  response: express.Response
) => {
  const { rangeBidValue } = request.body; /* 1000-2000 */
  const rangeSplit = rangeBidValue.split("-");
  const firstElement = rangeSplit[0];
  const secondElement = rangeSplit[1];

  try {
    const ETHPrice = await fetch(COINBASE_API_URL);
    const { data } = await ETHPrice.json();
    const intETHValue = parseInt(data.rates.BRL);

    if (firstElement <= intETHValue && intETHValue <= secondElement) {
      return response.sendStatus(202);
    }

    return response.status(406).json(intETHValue);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Error on fetching data" });
  }
};

//#endregion

const transaction = {
  create,
};

export default transaction;
