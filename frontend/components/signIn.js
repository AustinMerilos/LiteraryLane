import gql from "graphql-tag";
import Form from "../styles/form";
import useForm from "../utils/useForm";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./user";
import DisplayError from "./errorMessage";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: ``,
    password: ``,
  });

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await signin();
    resetForm();
  }

  const error =
    data?.authenticateUserWithPassword.__typename ===
    "UserAuthenticationWithPasswordFailure"
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign into your account</h2>
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
        <button type="Submit"> Sign in</button>
      </fieldset>
    </Form>
  );
}
