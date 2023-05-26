import React from "react";
import Header from "../components/header";
import { ApolloProvider } from "@apollo/client";
import withData from "../lib/withData";

function App({ Component, apollo }) {
  console.log(apollo);
  return (
    <>
      <ApolloProvider client={apollo}>
        <Header />
        <Component />
      </ApolloProvider>
    </>
  );
}

export default withData(App);
