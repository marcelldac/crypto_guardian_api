import { COINBASE_API_URL } from "../utils";

export default interface ITransactionService {
  validateTransaction(rangeBidValue: string): Promise<boolean>;
  separateBidValues(rangeBidValue: string): ISeparateBidValues;
  isTransactionValid(
    firstElement: number,
    intETHValue: number,
    secondElement: number
  ): boolean;
}

export interface ISeparateBidValues {
  firstElement: number;
  secondElement: number;
}

export class TransactionService implements ITransactionService {
  async validateTransaction(rangeBidValue: string): Promise<boolean> {
    try {
      const { firstElement, secondElement } =
        this.separateBidValues(rangeBidValue);
      const ETHPrice = await fetch(COINBASE_API_URL);
      const { data } = await ETHPrice.json();
      const intETHValue = parseInt(data.rates.BRL);
      const isValid = this.isTransactionValid(
        firstElement,
        secondElement,
        intETHValue
      );
      return isValid;
    } catch (error) {
      console.error(`Error validating transaction: ${error}`);
      throw new Error("Error on fetching data");
    }
  }
  separateBidValues(rangeBidValue: string): {
    firstElement: number;
    secondElement: number;
  } {
    const rangeSplit = rangeBidValue.split("-");
    const firstElement = parseInt(rangeSplit[0]);
    const secondElement = parseInt(rangeSplit[1]);
    const separatedBidValues: ISeparateBidValues = {
      firstElement,
      secondElement,
    };
    return separatedBidValues;
  }
  isTransactionValid(
    firstElement: number,
    intETHValue: number,
    secondElement: number
  ): boolean {
    let isValid = false;
    if (firstElement <= intETHValue && intETHValue <= secondElement) {
      isValid = true;
    }
    return isValid;
  }
}
