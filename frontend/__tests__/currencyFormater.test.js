// currencyFormater.test.js

import currencyFormatter from "../utils/currencyFormater";

describe("format currency function", () => {
  it("works with fractional dollars", () => {
    expect(currencyFormatter(1)).toEqual("0.01");
    expect(currencyFormatter(10)).toEqual("0.10");
    expect(currencyFormatter(9)).toEqual("0.09");
    expect(currencyFormatter(40)).toEqual("0.40");
  });

  it("has cents when it's whole dollars", () => {
    expect(currencyFormatter(5000)).toEqual("50.00");
    expect(currencyFormatter(100)).toEqual("1.00");
    expect(currencyFormatter(500000)).toEqual("5,000.00");
  });

  it("works with whole and fractional dollars", () => {
    expect(currencyFormatter(140)).toEqual("1.40");
    expect(currencyFormatter(5012)).toEqual("50.12");
    expect(currencyFormatter(110)).toEqual("1.10");
    expect(currencyFormatter(101)).toEqual("1.01");
    expect(currencyFormatter(34534545345345)).toEqual("345,345,453,453.45");
  });
});
