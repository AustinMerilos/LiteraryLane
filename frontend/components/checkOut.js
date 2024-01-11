import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import nProgress from "nprogress";

const CheckOutFormStyle = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIP_KEY);

function CheckOutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

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
    setLoading(false);
    nProgress.done();
  }
  return (
    <CheckOutFormStyle onSubmit={handleSubmit}>
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
