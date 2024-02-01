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
  it("should separate bid values", () => {
    const rangeBidValue = "10000-20000";
    const rangeSplit = rangeBidValue.split("-");
    const firstElement = parseInt(rangeSplit[0]);
    const secondElement = parseInt(rangeSplit[1]);
    expect(firstElement).toBe(10000);
    expect(secondElement).toBe(20000);
  });
});
