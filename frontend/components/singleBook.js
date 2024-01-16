import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import styled from "styled-components";
import currencyFormater from "../utils/currencyFormater";

const SingleBookStyles = styled.div`
  display: grid;
  grid-auto-columns: 0.4fr;
  grid-auto-flow: column;
  min-height: 800px;
  max-width: var(--maxwidth);
  justify-content: center;
  align-items: top;
  gap: 1rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;
const BookImage = styled.img`
  width: 100%;
  object-fit: contain;
  border-radius: 8px; /* Optional: Add border-radius for rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Add box-shadow for a subtle shadow effect */
`;

const BookContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BookTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 10px;
`;

const BookDescription = styled.p`
  font-size: 20px;
  color: #555;
  margin-bottom: 15px;
  letter-spacing: 1px;
`;

const BookPrice = styled.h3`
  font-size: 25px;
  color: #333;
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
    <>
      <Head>
        <title>LiteraryLane | {Product.name}</title>
      </Head>
      <SingleBookStyles>
        <BookImage
          src={Product.photo.image.publicUrlTransformed}
          alt={Product.name}
        ></BookImage>
        <BookContainer>
          <BookTitle>{Product.name} </BookTitle>
          <BookDescription>{Product.description} </BookDescription>
          <BookPrice>Price: {currencyFormater(Product.price)}$ </BookPrice>
        </BookContainer>
      </SingleBookStyles>
    </>
  );
}
