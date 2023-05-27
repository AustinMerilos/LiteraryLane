import React from "react";
import { ProductItem, PriceTag, Title } from "./styles";
import Link from "next/link";
import currencyFormater from "../../utils/currencyFormater";

export default function Product({ product }) {
  return (
    <ProductItem>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{currencyFormater(product.price)}</PriceTag>
    </ProductItem>
  );
}
