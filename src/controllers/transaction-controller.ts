import * as express from "express";

const COINBASE_API_URL =
  "https://api.coinbase.com/v2/exchange-rates?currency=ETH";

//#region Create Transaction

/**
 * The function takes a range bid value, fetches the current ETH price, and returns a response based on
 * whether the ETH price falls within the specified range.
 * @param request - The 'request' parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, etc.
 * @param response - The 'response' parameter is an object representing the HTTP response that will be
 * sent back to the client. It is an instance of the 'express.Response' class, which provides methods
 * for sending the response, such as 'send', 'json', and 'status'.
 * @returns The function 'create' returns a response to the client. If firstElement is less than
 * intETHValue and intETHValue is less than secondElement' is true, it returns a status code of 202 (Accepted).
 * Otherwise, it returns a status code of 406 (Not Acceptable) along with the value of 'intETHValue' in
 * the response body. If there is an error during the process, an appropriate error message is returned.
 */

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
