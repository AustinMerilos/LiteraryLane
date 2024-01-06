import gql from "graphql-tag";
import Form from "../styles/form";
import useForm from "../utils/useForm";
import { useMutation } from "@apollo/client";
import DisplayError from "./errorMessage";
import { useState } from "react";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;
export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: ``,
    name: ``,
    password: ``,
  });
  const [passwordError, setPasswordError] = useState(null);

  const [signUp, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    // Check if the password length is less than 8 characters

    if (inputs.password.length < 8) {
      setPasswordError("Password must be at least 8 or more characters long");
      return;
    } else {
      // Clear the password error if it was previously set
      setPasswordError(null);
    }

    await signUp().catch(console.log(error));

    resetForm();
  }

  if (data?.createUser) {
    return (
      <>
        <h2>Signed up with {data.createUser.email} - Ready to Sign in!</h2>
      </>
    );
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign up for a account</h2>
      <DisplayError error={data?.authenticateUserWithPassword}></DisplayError>
      <fieldset>
        <label htmlFor="name">
          Your Name
          <input
            type="text"
            name="name"
            placeholder="Your name "
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          ></input>
        </label>
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
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Your password"
            autoComplete="Password"
            value={inputs.password}
            onChange={handleChange}
          ></input>
        </label>
        {/* Display password length error if present */}
        {passwordError && <p>{passwordError}</p>}
        <button type="Submit"> Sign in</button>
      </fieldset>
    </Form>
  );
}
