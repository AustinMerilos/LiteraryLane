import React from "react";
import Navbar from "./navbar";
import Link from "next/link";
import { styled } from "styled-components";

const HeaderContainer = styled.div`
  align-items: center;
  height: 100px;

  @media (max-width: 768px) {
    width: fit-content;
  }
`;

const SearchBar = styled.div`
  margin: 50px;
`;

export default function Header() {
  return (
    <>
      <HeaderContainer>
        <Navbar />
      </HeaderContainer>
      <SearchBar>Search</SearchBar>
    </>
  );
}
