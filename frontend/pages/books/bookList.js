import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { BookListStyles } from "../../styles/book";
import Book from "./book";

export const ALL_BOOKS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function BookList() {
  const { data, error, loading } = useQuery(ALL_BOOKS_QUERY);
  console.log(data, error, loading);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <BookListStyles>
        {data.allProducts.map((product) => (
          <Book key={product.id} product={product} />
        ))}
      </BookListStyles>
    </div>
  );
}
