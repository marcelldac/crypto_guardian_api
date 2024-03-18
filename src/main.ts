import * as cors from "cors";
import express, { Application, json } from "express";

import TransactionRouter from "./routes/transaction-router";

export class App {
  private app: Application;
  private transactionRouter: TransactionRouter;

  constructor() {
    this.transactionRouter = new TransactionRouter();
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares() {
    this.app.use(cors());
    this.app.use(json());
  }

  private setupRoutes() {
    this.app.use("/api/v1", this.transactionRouter.getRouter());
  }

  startServer(port: number) {
    this.app.listen(port, () => {
      console.log(`App Running on ${port} 🚀`);
    });
  }
}

const PORT = parseInt(process.env.PORT) || 3000;
const app = new App();

app.startServer(PORT);
