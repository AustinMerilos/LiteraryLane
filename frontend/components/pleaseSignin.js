import Signin from "./signIn";
import useUser from "./user";
import React from "react";

export default function ({ children }) {
  const me = useUser();
  if (!me) return <Signin />;
  return children;
}
