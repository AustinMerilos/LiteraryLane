import gql from "graphql-tag";
import Form from "../styles/form";
import useForm from "../utils/useForm";
import { useMutation } from "@apollo/client";
import DisplayError from "./errorMessage";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: ``,
  });

  const [signUp, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await signUp().catch(console.log(error));
    resetForm();
  }
  if (data?.sendUserPasswordResetLink === null) {
    return (
      <>
        <h2>Success! Check your email for a link!</h2>
      </>
    );
  }
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request password reset</h2>
      <DisplayError error={data?.authenticateUserWithPassword}></DisplayError>
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            autoComplete="Email"
            value={inputs.email}
            onChange={handleChange}
          ></input>
        </label>

        <button type="Submit"> Request reset</button>
      </fieldset>
    </Form>
  );
}
