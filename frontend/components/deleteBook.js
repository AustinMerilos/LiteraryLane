import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_BOOK_MUTATION = gql`
  mutation DELETE_BOOK_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

export default function DeleteBook({ id, children }) {
  const [deleteBook, { loading, error }] = useMutation(DELETE_BOOK_MUTATION, {
    variables: { id },
  });
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm("Do you wan to delete this book?")) {
          deleteBook().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}
