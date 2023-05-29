import React from "react";
import { styled } from "styled-components";
import Link from "next/link";

// Styled navigation bar container
const NavBar = styled.nav`
  display: flex;
  background-color: #333;
  padding: 20px;
  border: 2px solid #ffcc00;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

// Styled navigation bar list
const NavList = styled.ul`
  list-style: none;
  flex: auto;
  display: flex;
  justify-content: center;
  padding: 10px;
`;

// Styled navigation bar list item
const NavItem = styled.li`
  margin: 0 10px;

  @media (max-width: 768px) {
    margin: 0 5px;
  }
`;

// Styled navigation bar link
const NavLink = styled.a`
  font-size: 28px;
  color: #fff;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 3px 8px;
  }
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

// Navbar component
export default function Navbar() {
  return (
    <>
      <NavBar>
        <Link href="/" passHref>
          <Logo>LiteraryLane</Logo>
        </Link>
        <NavList>
          <NavItem>
            <Link href="/products" style={{ textDecoration: "none" }}>
              <NavLink>Products</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/sell" style={{ textDecoration: "none" }}>
              <NavLink>Sell</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/account" style={{ textDecoration: "none" }}>
              <NavLink>Account</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/orders" style={{ textDecoration: "none" }}>
              <NavLink>Orders</NavLink>
            </Link>
          </NavItem>
        </NavList>
      </NavBar>
    </>
  );
}
