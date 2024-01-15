import React from "react";
import SellForm from "./sellForm";
import styled from "styled-components";
import PleaseSignin from "../../components/pleaseSignin";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SellPage() {
  return (
    <PleaseSignin>
      <Container>
        <SellForm />
      </Container>
    </PleaseSignin>
  );
}
