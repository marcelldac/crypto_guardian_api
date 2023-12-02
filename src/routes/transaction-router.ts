import * as express from "express";

import transaction from "../controllers/transaction-controller";

const transactionRouter = express.Router();

/* `transactionRouter.use(express.json());` is setting up the middleware for parsing JSON data in the
request body. */

transactionRouter.use(express.json());

transactionRouter.post("/transaction", transaction.create);

export default transactionRouter;
