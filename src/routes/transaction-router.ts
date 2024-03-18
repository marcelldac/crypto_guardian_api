import { Router, json } from "express";

import { TransactionController } from "../controllers/transaction-controller";
import ITransactionRouter from "./ITransaction-router";

class TransactionRouter implements ITransactionRouter {
  private transactionController: TransactionController;

  constructor() {
    this.transactionController = new TransactionController();
  }

  public getRouter() {
    const transactionRouter = Router();
    transactionRouter.use(json());

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

export default TransactionRouter;
