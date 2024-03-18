import { Request, Response } from "express";
import { TransactionService } from "../services/transaction-service";
import ITransactionController from "./ITransaction-controller";

export class TransactionController implements ITransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  validateTransaction = async (request: Request, response: Response) => {
    try {
      const { rangeBidValue } = request.body;

      const isTransactionValid =
        await this.transactionService.validateTransaction(rangeBidValue);

      if (isTransactionValid) {
        return response
          .status(202)
          .json({ message: "Transaction Valid", error: false });
      } else {
        return response
          .status(406)
          .json({ message: "Increase the amount", error: false });
      }
    } catch (error) {
      return response.status(500).json({ message: error, error: true });
    }
  };

  sendBRLPrice = async (_: Request, response: Response) => {
    try {
      const price = await this.transactionService.getBRLPrice();

      return response
        .status(200)
        .json({ message: price.toFixed(2), error: false });
    } catch (error) {
      return response.status(500).json({ message: error, error: true });
    }
  };
}
