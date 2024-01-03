import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import styled from "styled-components";
import currencyFormater from "../utils/currencyFormater";

const SingleBookStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  max-width: var(--maxwidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
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

export default function SingleBook() {
  const router = useRouter();
  const { id: queryId } = router.query; // Renamed the variable to queryId to avoid conflicts

  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id: queryId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const { Product } = data;
  // Rest of your component logic using data and queryId
  return (
    <SingleBookStyles>
      <Head>
        <title>LiteraryLane | {Product.name}</title>
      </Head>

      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.name}
      ></img>
      <div>
        <h2>{Product.name} </h2>
        <p>{Product.description} </p>
        <div>I cost {currencyFormater(Product.price)} </div>
      </div>
    </SingleBookStyles>
  );
}
