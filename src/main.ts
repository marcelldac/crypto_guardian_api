import * as express from "express";
import * as cors from "cors";

import { TransactionRouter } from "./routes/transaction-router";

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private setupRoutes() {
    const transactionRouter = new TransactionRouter().getRouter();
    this.app.use("/api/v1", transactionRouter);
  }

  public startServer(port: number, host: string) {
    this.app.listen(port, () => {
      console.log(`App Running on ${host}:${port}`);
    });
  }
}

const HOST = "localhost";
const PORT = parseInt(process.env.PORT) || 3000;

const app = new App();
app.startServer(PORT, HOST);
