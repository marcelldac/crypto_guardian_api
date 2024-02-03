import { COINBASE_API_URL } from "../utils";
import axios from "axios";

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

export class TransactionService implements ITransactionService {
  async validateTransaction(rangeBidValue: string): Promise<boolean> {
    try {
      const { minValue, maxValue } = this.separateBidValues(rangeBidValue);
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
  separateBidValues(rangeBidValue: string): ISeparateBidValues {
    const rangeSplit = rangeBidValue.split("-");
    const minValue = parseInt(rangeSplit[0]);
    const maxValue = parseInt(rangeSplit[1]);
    const separatedBidValues: ISeparateBidValues = {
      minValue,
      maxValue,
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
  async getBRLPrice(): Promise<number> {
    try {
    const { data } = await axios.get(COINBASE_API_URL);
      const BRLPrice = data.data.rates.BRL;
      const floatPrice = parseFloat(BRLPrice);
      return floatPrice;
    } catch (error) {
      throw new Error(`Failed to request BRL price: ${error}`);
    }
  }
}
