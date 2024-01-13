import gql from "graphql-tag";
import DisplayError from "../../components/errorMessage";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import { OrderItemStyles, OrderUl } from "./styles";
import currencyFormater from "../../utils/currencyFormater";
import Link from "next/link";

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
          <OrderItemStyles key={order.id} pass>
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
