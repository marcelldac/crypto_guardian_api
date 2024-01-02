import { MScrapping } from "mscrapping-crypto-guardian";

export class WebScrappingService {
  private MScrapping: MScrapping;

  constructor() {
    this.MScrapping = new MScrapping(
      "Info Moedas",
      "https://www.infomoney.com.br/tudo-sobre/criptomoedas/",
      "#infiniteScroll > article > div > a > h3"
    );
  }

  public start() {
    return this.MScrapping.start();
  }
}
