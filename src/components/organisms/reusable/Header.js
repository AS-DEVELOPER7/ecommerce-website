import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiSearchLine, RiMenuLine, RiCloseLine } from "react-icons/ri";
import Image from "next/image";

export default function Header() {
  const cart = useSelector((s) => s.cart.items || []);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 flex items-center justify-between transition-all duration-300 px-6 sm:px-12 bg-white/85 backdrop-blur-lg border-b border-white/50 shadow-sm ${
          scrolled ? "py-3.5 shadow-md" : "py-5"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 text-primary group">
          <Image
            src="/logo.png"
            alt="Logo"
            width={44}
            height={44}
            className="group-hover:scale-105 transition-transform duration-300"
          />
          <h2 className="text-sm sm:text-lg font-bold font-serif tracking-wide text-base group-hover:text-secondary transition-colors">
            Tarmal Creation
          </h2>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden md:flex items-center gap-9">
            {[
              ["Home", "/"],
              ["Shop Catalog", "/shop"],
              ["About Us", "/about"],
              ["Contact Us", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-muted hover:text-primary transition-colors relative py-1 group"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <Link
            href="/shop"
            className="flex items-center justify-center rounded-xl h-10 w-10 border border-white/50 bg-glass-light/35 backdrop-blur-md text-base hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
          >
            <RiSearchLine className="text-lg" />
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center justify-center rounded-xl h-10 w-10 border border-white/50 bg-glass-light/35 backdrop-blur-md text-base hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
          >
            <HiOutlineShoppingBag className="text-lg" />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full shadow-sm animate-pulse">
                {count}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden flex items-center justify-center rounded-xl h-10 w-10 border border-white/50 bg-glass-light/35 backdrop-blur-md text-base hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
          >
            <RiMenuLine className="text-lg" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer frosted screen overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-lg flex justify-end">
          <div className="w-[80%] max-w-sm h-full bg-glass-heavy/90 border-l border-white/40 shadow-glass backdrop-blur-lg p-6 flex flex-col gap-8 relative">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-5 right-5 rounded-xl h-10 w-10 border border-glass/40 bg-glass/20 flex items-center justify-center text-base hover:bg-primary hover:text-white transition-all duration-300"
            >
              <RiCloseLine className="text-xl" />
            </button>

            <div className="flex items-center gap-3 text-primary mt-6">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
              <h2 className="text-md font-bold font-serif tracking-wide text-base">
                Tarmal Creation
              </h2>
            </div>

            <nav className="flex flex-col gap-6 mt-8">
              {[
                ["Home", "/"],
                ["Shop Catalog", "/shop"],
                ["About Us", "/about"],
                ["Contact Us", "/contact"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-base hover:text-primary transition-colors border-b border-glass/20 pb-3"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
