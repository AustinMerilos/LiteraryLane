import gql from "graphql-tag";
import DisplayError from "../../components/errorMessage";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import currencyFormater from "../../utils/currencyFormater";
import Link from "next/link";
import styled from "styled-components";

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

const OrderItemStyles = styled.li`
  box-shadow: var(--bs);
  list-style: none;
  padding: 2rem;
  border: 1px solid var(--offWhite);
  h2 {
    border-bottom: 2px solid red;
    margin-top: 0;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }

  .images {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    margin-top: 1rem;
    img {
      height: 200px;
      object-fit: cover;
      width: 100%;
    }
  }
  .order-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
    display: grid;
    text-align: center;
    & > * {
      margin: 0;
      background: rgba(0, 0, 0, 0.03);
      padding: 1rem 0;
    }
    strong {
      display: block;
      margin-bottom: 1rem;
    }
  }
`;

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

function countItemsInAnOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function OrdersPage() {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { allOrders } = data;
  return (
    <div>
      <Head>
        <title>Your Orders ({allOrders.length})</title>
      </Head>
      <h2>You have {allOrders.length} orders!</h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles key={order.id} pass="true">
            <Link href={`/order/${order.id}`}>
              <div className="order-meta">
                <p>Qty {countItemsInAnOrder(order)} </p>
                <p>
                  {order.items.length} Title
                  {order.items.length === 1 ? "" : "s"}
                </p>
                <p>{currencyFormater(order.total)}</p>
              </div>
              <div className="images">
                {order.items.map((item) => (
                  <img
                    key={`image-${item.id}`}
                    src={item.photo?.image?.publicUrlTransformed}
                    alt={item.name}
                  />
                ))}
              </div>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
}
