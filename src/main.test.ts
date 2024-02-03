import axios from "axios";

describe("Api Test", () => {
  it("should get brl to ethereum value", async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/transaction"
    );
    expect(response.status).toBe(200);
    const output = response.data;
    expect(output.error).toBe(false);
  });
  it("should validate sended rangeBidValue", async () => {
    const payload = { rangeBidValue: "10000-20000" };
    const response = await axios.post(
      "http://localhost:3000/api/v1/validate-transaction",
      payload
    );
    expect(response.status).toBe(200 || 202);
    const output = response.data;
    expect(output.error).toBe(false);
  });
});
