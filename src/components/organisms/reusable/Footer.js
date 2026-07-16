"use client";
import Link from "next/link";
import { SOCIAL_LINKS } from "src/constants";
import Image from "next/image";

export default function Footer() {
  return (
    <footer 
      className="backdrop-blur-md border-t border-white/60 text-neutral-600 mt-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(238, 43, 140, 0.06) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 text-primary group">
              <Image
                src="/logo.png"
                alt="Logo"
                width={48}
                height={48}
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <h2 className="text-lg font-bold font-serif tracking-wide text-base">
                Tarmal Creation
              </h2>
            </Link>
            <p className="mt-4 text-sm max-w-sm text-neutral-500 leading-relaxed font-light">
              Exquisite handcrafted jewelry made with devotion and traditional artistry. Discover unique pieces designed to tell a story and bring elegant, warm harmony to your life.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-700">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                ["Home", "/"],
                ["Shop Catalog", "/shop"],
                ["About Us", "/about"],
                ["Contact Us", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-500 hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-700">
              Follow Us
            </h3>
            <div className="flex space-x-3.5">
              {SOCIAL_LINKS.map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-xl border border-white/60 bg-glass/20 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
                >
                  <Icon className="text-xl" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/30 pt-8 text-center text-xs text-neutral-500">
          <p>© 2026 Tarmal Creation. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
