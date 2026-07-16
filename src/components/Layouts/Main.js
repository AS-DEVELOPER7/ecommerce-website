"use client";

import { usePathname } from "next/navigation";
import Header from "../organisms/reusable/Header";
import Footer from "../organisms/reusable/Footer";

export default function Main({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return children;
  }

  return (
    <>
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}
