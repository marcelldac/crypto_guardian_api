import * as express from "express";
import * as cors from "cors";
import { TransactionRouter } from "./routes/transaction-router";
export class App {
  private app: express.Application;
  private transactionRouter: TransactionRouter;
  constructor() {
    this.transactionRouter = new TransactionRouter();
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }
  private setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  private setupRoutes() {
    this.app.use("/api/v1", this.transactionRouter.getRouter());
  }
  public startServer(port: number) {
    this.app.listen(port, () => {
      console.log(`App Running on ${port} 🚀`);
    });
  }
}
const PORT = parseInt(process.env.PORT) || 3000;
const app = new App();
app.startServer(PORT);
