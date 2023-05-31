import React from "react";
import SellForm from "./sellForm";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SellPage() {
  return (
    <Container>
      <SellForm />
    </Container>
  );
}
