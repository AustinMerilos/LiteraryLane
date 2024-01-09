import styled from "styled-components";
import CartStyles from "../styles/cart";
import { Logo } from "./navbar";
import useUser from "./user";
import currencyFormater from "../utils/currencyFormater";
import totalPrice from "../utils/totalPrice";
import { useCart } from "../utils/cartState";
import RemoveFromCart from "./removeFromCart";
import { CheckOut } from "./checkOut";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid lightGrey;

  img {
    margin-right: 1rem;
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

function CartItem({ cartItem }) {
  const book = cartItem.product;
  if (!book) return null;
  return (
    <CartItemStyles>
      <img
        width="100"
        src={book.photo.image.publicUrlTransformed}
        alt={book.name}
      ></img>
      <div>
        <h3>{book.name}</h3>
        <p>
          {currencyFormater(book.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {currencyFormater(book.price)} each
          </em>
        </p>
      </div>
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
        <button onClick={closeCart}>close cart</button>
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
