import React from "react";
import { styled } from "styled-components";
import Link from "next/link";

// Styled navigation bar container
const NavBar = styled.nav`
  background-color: #333;
  padding: 20px;
`;

// Styled navigation bar list
const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
`;

// Styled navigation bar list item
const NavItem = styled.li`
  margin: 0 10px;
`;

// Styled navigation bar link
const NavLink = styled.p`
  color: #fff;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background-color: #555;
  }
`;

// Navbar component
export default function Navbar() {
  return (
    <NavBar>
      <NavList>
        <NavItem>
          <Link href="/products">
            <NavLink>Products</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/sell">
            <NavLink>Sell</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/account">
            <NavLink>Account</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/orders">
            <NavLink>Orders</NavLink>
          </Link>
        </NavItem>
      </NavList>
    </NavBar>
  );
}
