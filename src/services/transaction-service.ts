const COINBASE_API_URL =
  "https://api.coinbase.com/v2/exchange-rates?currency=ETH";

/**
 * The function `validateTransaction` takes a range bid value as input, fetches the current ETH price
 * from a Coinbase API, and returns whether the ETH price falls within the specified range bid value
 * along with the parsed ETH value.
 * @param rangeBidValue - The parameter `rangeBidValue` is a string that represents a range of
 * bid values. It is used to determine if a transaction is valid or not.
 * @returns The function `validateTransaction` returns a promise that resolves to an object with two
 * properties: `isValid` and `intETHValue`.
 */
export const validateTransaction = async (
  rangeBidValue: string
): Promise<{ isValid: boolean; intETHValue: number }> => {
  const { firstElement, secondElement } = getRangeBidValues(rangeBidValue);

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
    console.error(`Error on validate transaction: ${error}`);
    throw new Error(`Error on fetching data`);
  }
};

/**
 * The function `getRangeBidValues` takes a string representing a range of bid values and returns an
 * object with the first and second elements of the range as numbers.
 * @param rangeBidValue - rangeBidValue is a string representing a range of bid values. It is
 * expected to be in the format "x-y", where x and y are numbers representing the lower and upper
 * bounds of the range respectively.
 * @returns The function `getRangeBidValues` returns an object with two properties: `firstElement` and
 * `secondElement`. The values of these properties are the first and second elements of the
 * `rangeBidValue` string, respectively, after splitting the string by the "-" character and converting
 * them to numbers using `parseInt`.
 */
const getRangeBidValues = (
  rangeBidValue: string
): { firstElement: number; secondElement: number } => {
  const rangeSplit = rangeBidValue.split("-");
  const firstElement = parseInt(rangeSplit[0]);
  const secondElement = parseInt(rangeSplit[1]);
  return {
    firstElement,
    secondElement,
  };
};
