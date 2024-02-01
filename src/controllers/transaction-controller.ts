import * as express from "express";
import { TransactionService } from "../services/transaction-service";
import { COINBASE_API_URL } from "../constants/index";
export class TransactionController {
  private transactionService: TransactionService;
  constructor() {
    this.transactionService = new TransactionService();
  }
  public create = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { rangeBidValue } = request.body; /* 1000-2000 */
    try {
      const isTransactionValid =
        await this.transactionService.validateTransaction(rangeBidValue);
      if (isTransactionValid)
        return response.status(202).json({ message: "valid", error: false });
      return response.send({ message: "invalid", error: false });
    } catch (error) {
      return response.status(500).json({ message: error, error: true });
    }
  };
  public read = async (_: express.Request, response: express.Response) => {
    try {
      const ETHPrice = await fetch(COINBASE_API_URL);
      const { data } = await ETHPrice.json();
      const BRLEthereumPrice = data.rates.BRL;
      const payload = {
        "BRL-ETH": BRLEthereumPrice,
      };
      return response.status(200).json({ message: payload, error: false });
    } catch (error) {
      return response.status(500).json({ message: error, error: true });
    }
  };
}
