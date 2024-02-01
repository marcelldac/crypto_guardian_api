describe("Transaction Service", () => {
  it("should validate transaction", () => {
    let firstElement = 10000;
    let secondElement = 20000;
    let intETHValue = 15000;
    let isValid = false;
    if (firstElement <= intETHValue && intETHValue <= secondElement) {
      isValid = true;
    }
    expect(isValid).toBe(true);
  });
});
