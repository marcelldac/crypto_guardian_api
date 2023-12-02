import * as express from "express";
import * as cors from "cors";

import transactionRouter from "./routes/transaction-router";

const HOST = "localhost";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/", transactionRouter);

app.listen(PORT, () => {
  console.log(`App Running on ${HOST}:${PORT}`);
});
