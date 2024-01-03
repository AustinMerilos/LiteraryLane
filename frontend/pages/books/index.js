import React from "react";
import BookList from "./bookList";
import Pagination from "../../components/pagination";

export default function BookPage() {
  return (
    <>
      <Pagination page={1} />
      <BookList />
      <Pagination page={2} />
    </>
  );
}
