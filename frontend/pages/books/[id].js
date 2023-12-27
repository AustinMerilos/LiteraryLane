import { useRouter } from "next/router";
import SingleBook from "../../components/singleBook";

export default function SingleProductPage({ query }) {
  const router = useRouter();
  const { id } = router.query;

  return <SingleBook id={id}></SingleBook>;
}
