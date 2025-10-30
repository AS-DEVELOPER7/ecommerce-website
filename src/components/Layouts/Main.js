"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import {
  RiInstagramLine,
  RiFacebookBoxLine,
  RiPinterestLine,
  RiSearchLine,
} from "react-icons/ri";
import { LuGem } from "react-icons/lu";

function Header() {
  const cart = useSelector((s) => s.cart.items || []);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border px-4 sm:px-10 py-3 bg-surface/90 backdrop-blur-md">
      <Link href="/" className="flex items-center gap-2 text-primary">
        <LuGem className="text-2xl" />
        <h2 className="text-lg font-bold font-serif text-base">Aura Jewels</h2>
      </Link>

      <div className="flex gap-3 sm:gap-4">
        <nav className="hidden md:flex items-center gap-9">
          {[
            ["Home", "/"],
            ["Shop", "/shop"],
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

function Footer() {
  return (
    <footer className="bg-surface border-t border-border text-muted mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <LuGem className="text-2xl" />
              <h2 className="text-lg font-bold font-serif text-base">
                Aura Jewels
              </h2>
            </Link>
            <p className="mt-4 text-sm max-w-sm text-muted">
              Handcrafted jewelry made with love. Discover unique pieces that
              tell a story.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-base">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                ["Home", "/"],
                ["Shop", "/shop"],
                ["About Us", "/about"],
                ["Contact Us", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted hover:text-primary transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-base">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {[RiInstagramLine, RiFacebookBoxLine, RiPinterestLine].map(
                (Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="hover:text-primary transition"
                  >
                    <Icon className="text-2xl" />
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted">
          <p>© 2025 Aura Jewels. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Main({ children }) {
  return (
    <>
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}
