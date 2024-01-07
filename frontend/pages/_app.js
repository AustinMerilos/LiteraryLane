import React from "react";
import Header from "../components/header";
import { ApolloProvider } from "@apollo/client";
import withData from "../utils/withData";
import { CartStateProvider } from "../utils/cartState";

function App({ Component, apollo }) {
  return (
    <>
      <ApolloProvider client={apollo}>
        <CartStateProvider>
          <Header />
          <Component />
        </CartStateProvider>
      </ApolloProvider>
    </>
  );
}

// MyApp.getInitialProps = async function ({ Component, ctx }) {
//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }
//   pageProps.query = ctx.query;
//   return { pageProps };
// };

export default withData(App);
