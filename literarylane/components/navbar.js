import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav>
      <Link href={"/products"}>Products</Link>
      <Link href={"/sell"}>Sell</Link>
      <Link href={"/account"}>Account</Link>
      <Link href={"/orders"}>Orders</Link>
    </nav>
  );
}
