"use client";

import Link from "next/link";
import { HOME_IMAGES } from "src/constants/images";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[50vh] sm:min-h-[75vh] px-4 sm:px-6 overflow-hidden">
      {/* Background Image with Parallax effect could be added here */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HOME_IMAGES.hero})` }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        <span className="text-white/80 font-display uppercase tracking-[0.3em] text-xs sm:text-sm mb-6">
          New Collection 2026
        </span>
        <h1 className="text-white text-3xl sm:text-7xl lg:text-8xl font-serif font-medium mb-6 leading-[1.1] drop-shadow-lg">
          Elegance, <br className="hidden sm:block" />
          Handcrafted for You
        </h1>
        <p className="text-white/90 max-w-2xl text-sm sm:text-xl font-light mb-10 drop-shadow-md">
          Discover our latest collection of unique, handcrafted jewelry made
          with love and absolute precision.
        </p>
        <Link
          href="/shop"
          className="group relative inline-flex items-center justify-center h-10 sm:h-14 px-10 bg-white hover:bg-primary text-xs sm:text-base font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            Shop New Collection
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
