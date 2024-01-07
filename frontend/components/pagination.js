import Head from "next/head";
import PaginationStyles from "../styles/pagination";
import Link from "next/link";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import DisplayError from "./errorMessage";
import { perPage } from "../config";

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;
export default function Pagination({ page }) {
  const { error, data, loading } = useQuery(PAGINATION_QUERY);
  if (loading) return "loading...";
  if (error) return <DisplayError error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>
          LiteraryLane - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/books/${page - 1}`} aria-disabled={page <= 1}>
        ← Prev
      </Link>
      <p>
        Page {page} of {pageCount}{" "}
      </p>
      <p>{count} items total </p>
      <Link href={`/books/${page + 1}`} aria-disabled={page >= pageCount}>
        Next →
      </Link>
    </PaginationStyles>
  );
}
