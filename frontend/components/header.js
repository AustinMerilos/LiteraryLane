import React from "react";
import Navbar from "./navbar";
import Link from "next/link";
import { styled } from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const Logo = styled.h1`
  font-family: "Arial", sans-serif;
  font-size: 40px;
  color: #333;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: linear-gradient(to right, #ffcc00, #ff9900);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border: 2px solid #333;
  border-radius: 4px;
  display: inline-block;
  padding: 10px;
  margin: 10px;
  transform: skew(-10deg);

  @media (max-width: 768px) {
    font-size: 24px;
    padding: 8px;
  }
`;

export default function Header() {
  return (
    <>
      <HeaderContainer>
        <Link href="/" passHref>
          <Logo>LiteraryLane</Logo>
        </Link>
      </HeaderContainer>
      <Navbar />
      <p>Search</p>
    </>
  );
}
