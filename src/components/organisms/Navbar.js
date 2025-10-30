import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container h-14 flex items-center justify-between px-4">
        <Link href="/" className="font-black">
          Aura Jewels
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cart" className="font-semibold">
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
