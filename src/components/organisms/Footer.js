"use client";
import Link from "next/link";
import { SOCIAL_LINKS } from "src/constants";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border text-muted mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <Image src="/logo.png" alt="Logo" width={50} height={50} />
              <h2 className="text-lg font-bold font-serif text-base">
                Tarmal Creation
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
              {SOCIAL_LINKS.map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="hover:text-primary transition"
                >
                  <Icon className="text-2xl" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted">
          <p>© 2025 Tarmal Creation. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
