import { Router } from "express";

export default interface ITransactionRouter {
  getRouter(): Router;
}
