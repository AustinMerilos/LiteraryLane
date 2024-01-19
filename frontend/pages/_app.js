import React from "react";
import Head from "next/head";

import Header from "../components/header";
import { ApolloProvider } from "@apollo/client";
import withData from "../utils/withData";
import { CartStateProvider } from "../utils/cartState";
import nProgress from "nprogress";
import { Router } from "next/router";
import "../styles/nprogress.css";
import Footer from "../components/footer";

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

function App({ Component, apollo }) {
  return (
    <>
      <ApolloProvider client={apollo}>
        <CartStateProvider>
          <Header />
          <Component />
          <Footer />
        </CartStateProvider>
      </ApolloProvider>
    </>
  );
}

export default withData(App);
