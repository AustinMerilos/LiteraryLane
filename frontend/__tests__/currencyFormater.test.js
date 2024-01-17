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
    expect(currencyFormatter(120)).toEqual("1.20");
    expect(currencyFormatter(1011)).toEqual("10.11");
    expect(currencyFormatter(110)).toEqual("1.10");
    expect(currencyFormatter(101)).toEqual("1.01");
    expect(currencyFormatter(12345678912345)).toEqual("123,456,789,123.45");
  });
});
