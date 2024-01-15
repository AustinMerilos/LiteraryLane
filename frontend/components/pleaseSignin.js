import Signin from "./signIn";
import useUser from "./user";

export default function ({ children }) {
  const me = useUser();
  if (!me) return <Signin />;
  return children;
}
