"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiSearchLine } from "react-icons/ri";
import Image from "next/image";

export default function Header() {
  const cart = useSelector((s) => s.cart.items || []);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border px-4 sm:px-10 py-3 bg-surface/90 backdrop-blur-md">
      <Link href="/" className="flex items-center gap-2 text-primary">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
        <h2 className="text-xs sm:text-lg font-bold font-serif text-base">
          Tarmal Creation
        </h2>
      </Link>

      <div className="flex gap-3 sm:gap-4">
        <nav className="hidden md:flex items-center gap-9">
          {[
            ["Home", "/"],
            ["About Us", "/about"],
            ["Contact Us", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/shop"
          className="flex items-center justify-center rounded-lg h-10 w-10 bg-border hover:bg-primary hover:text-bg transition"
        >
          <RiSearchLine className="text-lg" />
        </Link>
        <Link
          href="/cart"
          className="relative flex items-center justify-center rounded-lg h-10 w-10 bg-border hover:bg-primary hover:text-bg transition"
        >
          <HiOutlineShoppingBag className="text-lg" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-bg text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
