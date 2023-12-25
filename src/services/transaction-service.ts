import { COINBASE_API_URL } from "../constants/index";

export class TransactionService {
  public async validateTransaction(rangeBidValue: string): Promise<boolean> {
    const { firstElement, secondElement } =
      this.getRangeBidValues(rangeBidValue);

    try {
      const ETHPrice = await fetch(COINBASE_API_URL);
      const { data } = await ETHPrice.json();
      const intETHValue = parseInt(data.rates.BRL);
      const isTransactionValid = this.isTransactionValid(
        firstElement,
        secondElement,
        intETHValue
      );

      return isTransactionValid;
    } catch (error) {
      console.error(`Error validating transaction: ${error}`);
      throw new Error("Error on fetching data");
    }
  }
  private getRangeBidValues(rangeBidValue: string): {
    firstElement: number;
    secondElement: number;
  } {
    const rangeSplit = rangeBidValue.split("-");
    const firstElement = parseInt(rangeSplit[0]);
    const secondElement = parseInt(rangeSplit[1]);

    return {
      firstElement,
      secondElement,
    };
  }

  private isTransactionValid(
    firstElement: number,
    secondElement: number,
    intETHValue: number
  ): boolean {
    if (firstElement <= intETHValue && intETHValue <= secondElement) {
      return true;
    }
    return false;
  }
}
