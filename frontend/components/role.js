import { gql, useQuery } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        role {
          name
          id
        }
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export default function useAdmin() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  console.log("User data:", data);

  const isAdmin = data?.authenticatedItem?.role?.name === "Admin";

  return isAdmin;
}
