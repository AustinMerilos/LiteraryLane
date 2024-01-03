import React from "react";
import { BookItem, PriceTag, Title, ButtonContainer } from "../../styles/book";
import Link from "next/link";
import currencyFormater from "../../utils/currencyFormater";
import DeleteBook from "../../components/deleteBook";

export default function Book({ product }) {
  return (
    <>
      <BookItem>
        <img
          src={product?.photo?.image?.publicUrlTransformed}
          alt={product.name}
        />
        <Title>
          <Link href={`/books/${product.id}`}>{product.name}</Link>
        </Title>
        <PriceTag>{currencyFormater(product.price)}</PriceTag>
        <ButtonContainer>
          <Link href={{ pathname: `update`, query: { id: product.id } }}>
            Edit
          </Link>
          <DeleteBook id={product.id}>Delete</DeleteBook>
        </ButtonContainer>
      </BookItem>
    </>
  );
}
