import React from "react";
import Navbar from "./navbar";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <Link href="/">LiteraryLane</Link>
      <Navbar />
    </>
  );
}
