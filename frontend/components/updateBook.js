import React from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import Form from "../styles/form";
import DisplayError from "./errorMessage";
import useForm from "../utils/useForm";

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
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
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

  const [
    updateProduct,
    { data: updateData, error: updateError, loadin: updateLoading },
  ] = useMutation(UPDATE_BOOK_MUTATION);

  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);
  if (loading) return <p>loading...</p>;

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id: id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        }).catch(console.error);
        // // Submit the inputfields to the backend:
        // const res = await createProduct();
        // clearForm();
        // Router.push({
        //   pathname: `/books/${res.data.createProduct.id}`,
        // });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit"> Update Book</button>
      </fieldset>
    </Form>
  );
}
