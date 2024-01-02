import * as express from "express";
import { WebScrappingController } from "../controllers/webscrapping-controller";

export class WebScrappingRouter {
  private webscrappingController: WebScrappingController;

  constructor() {
    this.webscrappingController = new WebScrappingController();
  }

  public getRouter() {
    const transactionRouter = express.Router();
    transactionRouter.use(express.json());
    transactionRouter.get("/webscrapping", this.webscrappingController.start);
  }
}
