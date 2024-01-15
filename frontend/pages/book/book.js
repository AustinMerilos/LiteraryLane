import React from "react";
import { BookItem, PriceTag, Title, ButtonContainer } from "../../styles/book";
import Link from "next/link";
import currencyFormater from "../../utils/currencyFormater";
import DeleteBook from "../../components/deleteBook";
import AddToCart from "../../components/addToCart";
import useUser from "../../components/user";
import useAdmin from "../../components/role";

export default function Book({ product }) {
  const isAdmin = useAdmin();
  return (
    <>
      <BookItem>
        <img
          src={product?.photo?.image?.publicUrlTransformed}
          alt={product.name}
        />
        <Title>
          <Link href={`/book/${product.id}`}>{product.name}</Link>
        </Title>
        <PriceTag>{currencyFormater(product.price)}</PriceTag>
        {isAdmin && (
          <ButtonContainer>
            <Link href={{ pathname: `update`, query: { id: product.id } }}>
              Edit
            </Link>
            <DeleteBook id={product.id}>Delete</DeleteBook>
            <AddToCart id={product.id} />
          </ButtonContainer>
        )}
      </BookItem>
    </>
  );
}
