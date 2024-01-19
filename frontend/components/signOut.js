import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./user";
import { useMutation } from "@apollo/client";
import { styled } from "styled-components";
import React from "react";

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

const SignOutButton = styled.a`
  font-size: 28px;
  color: #fff;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 3px 8px;
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return <SignOutButton onClick={signout}>Sign Out</SignOutButton>;
}
