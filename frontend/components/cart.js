import styled from "styled-components";
import CartStyles from "../styles/cart";
import useUser from "./user";
import currencyFormater from "../utils/currencyFormater";
import totalPrice from "../utils/totalPrice";
import { useCart } from "../utils/cartState";
import RemoveFromCart from "./removeFromCart";
import { CheckOut } from "./checkOut";

const CartItemStyles = styled.li`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Adjust the column widths based on your needs */
  padding: 1rem 0;
  border-bottom: 1px solid lightGrey;

  img {
    margin-right: 1rem;
    max-width: 100%; /* Ensure the image doesn't exceed its container */
  }

  h3,
  p {
    margin: 0;
  }
`;

const CartFooter = styled.div`
  display: block;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid lightGrey;
  margin-bottom: 3rem;
`;

const CloseButton = styled.button`
  background: black;
  color: white;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
  &:hover {
    color: orange;
    cursor: pointer;
  }
`;

const TextContainer = styled.div`
  justify-content: top;
  margin: 25px;
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

function CartItem({ cartItem }) {
  const book = cartItem.product;
  if (!book) return null;
  return (
    <CartItemStyles>
      <img
        width="100"
        src={book.photo?.image.publicUrlTransformed}
        alt={book.name}
      />

      <TextContainer>
        <h3>{book.name}</h3>
        <p>
          <em>
            {cartItem.quantity} &times; {currencyFormater(book.price)} each
          </em>
        </p>
        <p> = {currencyFormater(book.price * cartItem.quantity)} total</p>
      </TextContainer>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();
  if (!me) {
    return null;
  }
  return (
    <>
      <CartStyles open={cartOpen}>
        <header>
          <Logo>{me.name}'s Cart</Logo>
        </header>
        <CloseButton onClick={closeCart}> &times; </CloseButton>
        <ul>
          {me.cart.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </ul>
        <CartFooter>
          <p>{currencyFormater(totalPrice(me.cart))}</p>
          <CheckOut />
        </CartFooter>
      </CartStyles>
    </>
  );
}
