import * as express from "express";

import { TransactionService } from "../services/transaction-service";

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
      const { isValid, intETHValue } =
        await this.transactionService.validateTransaction(rangeBidValue);

      if (isValid) {
        return response.sendStatus(202);
      }

      return response
        .status(406)
        .json({ message: `Transaction not valid. ETH Value: ${intETHValue}` });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Error on fetching data" });
    }
  };
}
