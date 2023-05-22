import React from "react";
import Header from "../components/header";

export default function App({ Component }) {
  return (
    <>
      <Header />
      <Component />
    </>
  );
}
