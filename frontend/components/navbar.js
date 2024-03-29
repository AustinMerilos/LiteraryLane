import React from "react";
import { styled } from "styled-components";
import Link from "next/link";
import useUser from "./user";
import SignOut from "./signout";
import { useCart } from "../utils/cartState";
import CartCount from "./cartCount";
import useAdmin from "./role";
import headerLogo from "../public/assets";
import Image from "next/image";

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
  flex: auto; /* Ensure the NavList takes up the available space */
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

const CartButton = styled.a`
  font-size: 28px;
  color: #fff;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  border: none; // Remove default button styles
  background: none; // Remove default button styles
  font-family: inherit; // Inherit font styles

  &:hover {
    background-color: #555;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 3px 8px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoName = styled.h1`
  font-family: "Arial", sans-serif;
  font-size: 40px;
  color: #333;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: linear-gradient(to right, #ffcc00, #ff9900);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 10px;
  margin: 10px;
  transform: skew(-10deg);

  @media (max-width: 768px) {
    font-size: 24px;
    padding: 8px;
  }
`;

const LogoImage = styled(Image)`
  width: 100px;
  height: auto;
  margin-right: -40px;
`;

// Navbar component
export default function Navbar() {
  const user = useUser();
  const isAdmin = useAdmin();
  const { openCart } = useCart();
  return (
    <>
      <NavBar>
        <Link href="/" style={{ textDecoration: "none" }}>
          <LogoContainer>
            <LogoImage
              src={headerLogo.bookLogo}
              alt="image of LiteraryLane logo"
            ></LogoImage>
            <LogoName>LiteraryLane</LogoName>
          </LogoContainer>
        </Link>

        <NavList>
          <NavItem>
            <Link href="/books" style={{ textDecoration: "none" }}>
              <NavLink>Books</NavLink>
            </Link>
          </NavItem>
          {user && (
            <>
              {isAdmin && (
                <NavItem>
                  <Link href="/sell" style={{ textDecoration: "none" }}>
                    <NavLink>Sell</NavLink>
                  </Link>
                </NavItem>
              )}
              <NavItem>
                <Link href="/orders" style={{ textDecoration: "none" }}>
                  <NavLink>Orders</NavLink>
                </Link>
              </NavItem>

              <NavItem>
                <SignOut />
              </NavItem>
              <NavItem>
                <CartButton onClick={openCart}>Cart</CartButton>
              </NavItem>
              <CartCount
                count={user.cart.reduce(
                  (tally, cartItem) =>
                    tally + (cartItem.product ? cartItem.quantity : 0),
                  0
                )}
              />
            </>
          )}

          {!user && (
            <>
              <NavItem>
                <Link href="/signIn" style={{ textDecoration: "none" }}>
                  <NavLink>Sign in</NavLink>
                </Link>
              </NavItem>
            </>
          )}
        </NavList>
      </NavBar>
    </>
  );
}
