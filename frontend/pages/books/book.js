import React from "react";
import { BookItem, PriceTag, Title } from "../../styles/book";
import Link from "next/link";
import currencyFormater from "../../utils/currencyFormater";

export default function Book({ product }) {
  return (
    <BookItem>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/books/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{currencyFormater(product.price)}</PriceTag>
    </BookItem>
  );
}
