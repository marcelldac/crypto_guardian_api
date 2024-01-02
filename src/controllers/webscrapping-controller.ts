import * as express from "express";
import { WebScrappingService } from "../services/webscrapping-service";

export class WebScrappingController {
  private webScrappingService: WebScrappingService;

  constructor() {
    this.webScrappingService = new WebScrappingService();
  }

  public start(req: express.Request, res: express.Response) {
    const webscrapping = this.webScrappingService.start();
    return res.status(200).json(webscrapping);
  }
}
