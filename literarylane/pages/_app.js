import React from "react";
import Home from ".";
import Header from "../components/header";
import Pages from "../components/pages";

export default function App({ Component }) {
  return (
    <>
      <Header />
      <Component />
    </>
  );
}
