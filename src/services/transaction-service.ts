const COINBASE_API_URL =
  "https://api.coinbase.com/v2/exchange-rates?currency=ETH";

/* escrever melhor */
export class TransactionService {
  public async validateTransaction(
    rangeBidValue: string
  ): Promise<{ isValid: boolean; intETHValue: number }> {
    const { firstElement, secondElement } =
      this.getRangeBidValues(rangeBidValue);

    try {
      const ETHPrice = await fetch(COINBASE_API_URL);
      const { data } = await ETHPrice.json();
      const intETHValue = parseInt(data.rates.BRL);

      if (firstElement <= intETHValue && intETHValue <= secondElement) {
        return {
          isValid: true,
          intETHValue,
        };
      }

      return {
        isValid: false,
        intETHValue,
      };
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
}
