import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const SINGLE_BOOK_QUERY = gql`
  query SINGLE_BOOK_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const UPDATE_BOOK_MUTATION = gql`
  mutation UPDATE_BOOK_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: INT
  ) {
    updateBook(
      id: $id
      data: { id: $id, name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateBook({ id }) {
  const { data, error, loading } = useQuery(SINGLE_BOOK_QUERY, {
    variables: { id },
  });
  console.log(data);
  return <p>update {id}</p>;
}
