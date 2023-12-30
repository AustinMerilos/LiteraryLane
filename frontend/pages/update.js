import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import UpdateBook from "../components/updateBook";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function UpdatePage() {
  const router = useRouter();
  return (
    <Container>
      <UpdateBook id={router.query.id} />
    </Container>
  );
}
