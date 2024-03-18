import { Request, Response } from "express";

export default interface ITransactionController {
  validateTransaction(request: Request, response: Response): Promise<any>;
  sendBRLPrice(_: Request, response: Response): Promise<any>;
}
