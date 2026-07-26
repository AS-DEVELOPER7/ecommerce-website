"use client";

import Link from "next/link";
import { SOCIAL_LINKS } from "src/constants";
import Image from "next/image";
import ParticleBackground3D from "../3d/ParticleBackground3D";
import { RiSparklingLine } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="relative bg-[#FDFBF7] border-t border-border text-neutral-700 mt-16 overflow-hidden">
      {/* Ambient Floating 3D Objects */}
      <ParticleBackground3D />

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-primary/40 shadow-[0_0_15px_rgba(238,43,140,0.2)] group-hover:scale-105 transition-transform">
                <Image src="/logo.png" alt="Logo" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold font-serif text-neutral-900 tracking-tight">
                  Tarmal Creation
                </h2>
                <span className="text-[10px] uppercase tracking-widest text-primary font-bold flex items-center gap-1">
                  <RiSparklingLine className="text-xs" /> Luxury Handcrafted Jewelry
                </span>
              </div>
            </Link>

            <p className="mt-5 text-sm max-w-md text-neutral-600 leading-relaxed font-normal">
              Elevating handcrafted jewelry into timeless art pieces. Designed with rare gems, pure gold, silver, and passion in Sagwara, India.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {[
                ["Home", "/"],
                ["Shop All", "/shop"],
                ["Our Story", "/about"],
                ["Contact Us", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-700 hover:text-primary transition-colors inline-block font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
              Connect With Us
            </h3>
            <p className="text-xs text-neutral-500">Follow our artisanal creation process & custom order showcases.</p>
            <div className="flex space-x-3">
              {SOCIAL_LINKS.map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white hover:bg-primary border border-border text-neutral-800 hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                >
                  <Icon className="text-xl" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 Tarmal Creation. All Rights Reserved.</p>
          <p className="flex items-center gap-1 font-medium">
            Handcrafted with <span className="text-primary">♥</span> & Meticulous Artistry
          </p>
        </div>
      </div>
    </footer>
  );
}
