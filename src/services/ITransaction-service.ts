export default interface ITransactionService {
  validateTransaction(rangeBidValue: string): Promise<boolean>;
  separateBidValues(rangeBidValue: string): ISeparateBidValues;
  isTransactionValid(
    firstElement: number,
    intETHValue: number,
    secondElement: number
  ): boolean;
  getBRLPrice(): Promise<number>;
}

export interface ISeparateBidValues {
  minValue: number;
  maxValue: number;
}
