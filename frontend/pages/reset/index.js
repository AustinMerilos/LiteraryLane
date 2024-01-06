import { useRouter } from "next/router";
import RequestReset from "../../components/requestReset";
import Reset from "../../components/reset";

export default function ResetPage() {
  const { query } = useRouter();
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>RESET YOUR PASSWORD</p>
      <Reset token={query.token} />
    </div>
  );
}
