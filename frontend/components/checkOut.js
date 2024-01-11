import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import gql from "graphql-tag";
import nProgress from "nprogress";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useCart } from "../utils/cartState";
import { CURRENT_USER_QUERY } from "./user";

const CheckOutFormStyle = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIP_KEY);

function CheckOutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const closeCart = useCart();

  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    nProgress.start();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);

    if (error) {
      setError(error);
      nProgress.done();
      return;
    }

    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });
    console.log(`Finished  the order!!`);
    console.log(order);

    router.push({
      pathname: `/order/[id]`,
      query: {
        id: order.data.checkout.id,
      },
    });

    closeCart();

    setLoading(false);
    nProgress.done();
  }
  return (
    <CheckOutFormStyle onSubmit={handleSubmit}>
      {graphQLError && <p style={{ fontSize: 12 }}>{error.graphQLError}</p>}
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      <CardElement />
      <button>Check Out</button>
    </CheckOutFormStyle>
  );
}

function CheckOut() {
  return (
    <Elements stripe={stripeLib}>
      <CheckOutForm />
    </Elements>
  );
}

export { CheckOut };
