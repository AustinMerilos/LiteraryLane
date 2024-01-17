import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { fakeItem } from "../utils/testUtils";
import Book from "../pages/book/book";
import React from "react";
import "@testing-library/jest-dom";

const product = fakeItem();

describe("<Book/>", () => {
  it("renders out the price tag and title", () => {
    const { container, debug } = render(
      <MockedProvider>
        <Book product={product} />
      </MockedProvider>
    );

    const priceTag = screen.getByText("50.00");
    expect(priceTag).toBeInTheDocument();
    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "/book/abc123");
    expect(link).toHaveTextContent(product.name);
  });
});
