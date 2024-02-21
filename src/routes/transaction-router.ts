import * as express from "express";
import { TransactionController } from "../controllers/transaction-controller";

export default interface ITransactionRouter {
  getRouter(): express.Router;
}
export class TransactionRouter implements ITransactionRouter {
  private transactionController: TransactionController;

  constructor() {
    this.transactionController = new TransactionController();
  }

  public getRouter() {
    const transactionRouter = express.Router();
    transactionRouter.use(express.json());

    transactionRouter.get(
      "/transaction",
      this.transactionController.sendBRLPrice
    );

    transactionRouter.post(
      "/validate-transaction",
      this.transactionController.validateTransaction
    );

    return transactionRouter;
  }
}
