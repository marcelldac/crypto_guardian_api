import * as express from "express";
import { TransactionService } from "../services/transaction-service";
import { COINBASE_API_URL, statusCodes } from "../utils";

export default interface ITransactionController {
  validateTransaction(
    request: express.Request,
    response: express.Response
  ): Promise<any>;
  read(_: express.Request, response: express.Response): Promise<any>;
}

export class TransactionController implements ITransactionController {
  private transactionService: TransactionService;
  constructor() {
    this.transactionService = new TransactionService();
  }
  validateTransaction = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { rangeBidValue } = request.body; /* 1000-2000 */
    try {
      const isTransactionValid =
        await this.transactionService.validateTransaction(rangeBidValue);
      if (isTransactionValid)
        return response
          .status(statusCodes.Accepted)
          .json({ message: "valid", error: false });
      return response.send({ message: "invalid", error: false });
    } catch (error) {
      return response
        .status(statusCodes.InternalServerError)
        .json({ message: error, error: true });
    }
  };
  read = async (_: express.Request, response: express.Response) => {
    try {
      const ETHPrice = await fetch(COINBASE_API_URL);
      const { data } = await ETHPrice.json();
      const BRLEthereumPrice = data.rates.BRL;
      return response
        .status(statusCodes.Ok)
        .json({ message: `BRL-ETH: ${BRLEthereumPrice}`, error: false });
    } catch (error) {
      return response
        .status(statusCodes.InternalServerError)
        .json({ message: error, error: true });
    }
  };
}
