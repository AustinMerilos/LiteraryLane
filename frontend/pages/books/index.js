import React from "react";
import BookList from "./bookList";
import Pagination from "../../components/pagination";
import { useRouter } from "next/router";

export default function BookPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <>
      <BookList page={page || 1} />
      <Pagination page={page || 1} />
    </>
  );
}
