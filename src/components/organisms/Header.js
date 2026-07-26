"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiSearchLine, RiSparklingLine } from "react-icons/ri";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const cart = useSelector((s) => s.cart.items || []);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/20 dark:border-white/10 px-4 sm:px-10 py-3 bg-surface/80 backdrop-blur-xl shadow-lg transition-all duration-300">
      {/* Brand Logo with 3D Glow */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative w-11 h-11 rounded-full overflow-hidden border border-primary/40 shadow-[0_0_15px_rgba(238,43,140,0.3)] group-hover:scale-105 transition-transform">
          <Image src="/logo.png" alt="Logo" fill className="object-cover" />
        </div>
        <div className="flex flex-col text-left">
          <h2 className="text-base sm:text-xl font-bold font-serif tracking-tight text-base group-hover:text-primary transition-colors">
            Tarmal Creation
          </h2>
          <span className="text-[10px] uppercase tracking-widest text-primary font-semibold flex items-center gap-1">
            <RiSparklingLine className="text-xs animate-pulse" /> Handcrafted Luxury
          </span>
        </div>
      </Link>

      {/* Navigation & Action Icons */}
      <div className="flex items-center gap-4 sm:gap-6">
        <nav className="hidden md:flex items-center gap-8">
          {[
            ["Home", "/"],
            ["Shop", "/shop"],
            ["About Us", "/about"],
            ["Contact Us", "/contact"],
          ].map(([label, href]) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative text-sm font-medium transition-colors ${
                  isActive ? "text-primary font-semibold" : "text-muted hover:text-primary"
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(238,43,140,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Search & Cart Quick Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            className="flex items-center justify-center rounded-xl h-11 w-11 bg-surface-base border border-border/80 hover:border-primary/50 hover:bg-primary hover:text-white transition-all shadow-sm hover:scale-105"
            title="Search Products"
          >
            <RiSearchLine className="text-lg" />
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center justify-center rounded-xl h-11 w-11 bg-surface-base border border-border/80 hover:border-primary/50 hover:bg-primary hover:text-white transition-all shadow-sm hover:scale-105"
            title="Shopping Cart"
          >
            <HiOutlineShoppingBag className="text-xl" />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(238,43,140,0.8)] animate-bounce">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
