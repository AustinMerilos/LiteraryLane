import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #333;
  padding: 1% 46% 1%;
  margin-top: 6vw;
  position: absolute;
  right: 0;
  left: 0;
`;

const Font = styled.p`
  color: white;
  font-size: 18px;

  @media (max-width: 576px) {
    font-size: 12px;
    margin-top: 2vw;
    padding: 1% 12% 1%;
  }
`;

const Footer = () => {
  return (
    <Container>
      <Font> LiteraryLane</Font>
    </Container>
  );
};

export default Footer;
