import * as express from "express";

import transaction from "../controllers/transaction-controller";

const transactionRouter = express.Router();

transactionRouter.use(express.json());

transactionRouter.post("/transaction", transaction.create);

export default transactionRouter;