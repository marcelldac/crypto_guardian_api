import * as express from "express";
import { TransactionService } from "../services/transaction-service";
import { statusCodes } from "../utils";

export default interface ITransactionController {
  validateTransaction(
    request: express.Request,
    response: express.Response
  ): Promise<any>;
  sendBRLPrice(_: express.Request, response: express.Response): Promise<any>;
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
    try {
      const { rangeBidValue } = request.body;
      const isTransactionValid =
        await this.transactionService.validateTransaction(rangeBidValue);
      if (isTransactionValid) {
        return response
          .status(statusCodes.Accepted)
          .json({ message: "valid", error: false });
      } else {
        return response
          .status(statusCodes.NotAcceptable)
          .json({ message: "invalid", error: false });
      }
    } catch (error) {
      return response
        .status(statusCodes.InternalServerError)
        .json({ message: error, error: true });
    }
  };
  sendBRLPrice = async (_: express.Request, response: express.Response) => {
    try {
      const price = await this.transactionService.getBRLPrice();
      return response
        .status(statusCodes.Ok)
        .json({ message: `BRL-ETH: ${price}`, error: false });
    } catch (error) {
      return response
        .status(statusCodes.InternalServerError)
        .json({ message: error, error: true });
    }
  };
}
