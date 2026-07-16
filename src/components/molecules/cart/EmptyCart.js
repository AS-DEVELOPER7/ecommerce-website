"use client";
import Link from "next/link";
import { RiShoppingBag3Line } from "react-icons/ri";

export default function EmptyCart() {
  return (
    <div className="max-w-3xl mx-auto text-center py-24">
      <RiShoppingBag3Line className="mx-auto text-6xl text-muted mb-4" />
      <p className="text-lg text-muted">Your cart is empty.</p>
      <Link
        href="/shop"
        className="mt-6 inline-flex py-3 px-6 rounded-full bg-primary text-white font-semibold hover:opacity-90"
      >
        Browse products
      </Link>
    </div>
  );
}
