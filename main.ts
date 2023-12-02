import * as express from "express";
import * as cors from "cors";

const PRICE_API_URL = "https://api.coinbase.com/v2/exchange-rates?currency=ETH";
const HOST = "localhost";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.post(
  "/api/v1/transaction",
  async (request: express.Request, response: express.Response) => {
    const { companyBidValue } = request.body;
    const { rangeBidValue } = request.body;
    try {
      const ETHPrice = await fetch(PRICE_API_URL);
      const { data } = await ETHPrice.json();
      const intETHValue = parseInt(data.rates.BRL);
      const intBidValue = parseInt(companyBidValue);

      if (companyBidValue) {
        if (intETHValue == intBidValue) {
          /* Fazer transação */
          return response.status(200).json(intETHValue);
        }
      }

      if (rangeBidValue) {
        const rangeSplit = rangeBidValue.split("-");
        const firstElement = rangeSplit[0];
        const secondElement = rangeSplit[1];

        if (firstElement <= intETHValue && intETHValue <= secondElement) {
          /* Fazer transação */
          return response
            .status(200)
            .json({ message: `Actual ETH value: ${intETHValue}` });
        }
      }

      return response.status(406).json(false);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Error on fetching api" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`App Running on ${HOST}:${PORT}`);
});
