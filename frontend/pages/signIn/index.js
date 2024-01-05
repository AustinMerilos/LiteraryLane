import React from "react";
import SignIn from "../../components/signIn";
import SignUp from "../../components/signUp";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

export default function SignInPage() {
  return (
    <>
      <Grid>
        <SignIn />
        <SignUp />
      </Grid>
    </>
  );
}
