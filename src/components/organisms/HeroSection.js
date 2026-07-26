"use client";

import Link from "next/link";
import { HOME_IMAGES } from "src/constants/images";
import { motion } from "framer-motion";
import Interactive3DCard from "src/components/3d/Interactive3DCard";
import ParticleBackground3D from "src/components/3d/ParticleBackground3D";
import { RiSparklingLine, RiShieldCheckLine, RiTruckLine } from "react-icons/ri";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[85vh] lg:min-h-[92vh] px-4 sm:px-6 overflow-hidden bg-[#FDFBF7]">
      {/* Background Image - Clean & Natural */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 transition-transform duration-1000"
        style={{ backgroundImage: `url(${HOME_IMAGES.hero})` }}
      />

      {/* Floating 3D Objects & Particle Canvas */}
      <ParticleBackground3D />

      {/* Luminous Light Scrim Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent pointer-events-none blur-3xl opacity-70" />

      {/* Hero Central Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center py-12"
      >
        {/* Floating Pearl Glass Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/85 backdrop-blur-xl border border-white shadow-[0_8px_25px_rgba(238,43,140,0.12)] mb-8"
        >
          <RiSparklingLine className="text-primary text-lg animate-pulse" />
          <span className="text-neutral-900 font-display uppercase tracking-[0.25em] text-xs font-bold">
            New Luxury Collection 2026
          </span>
        </motion.div>

        {/* Hero Title */}
        <h1 className="text-neutral-900 text-4xl sm:text-7xl lg:text-8xl font-serif font-medium mb-8 leading-[1.08] tracking-tight drop-shadow-sm">
          Elegance, <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-primary via-secondary to-amber-600 bg-clip-text text-transparent">
            Handcrafted for You
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-neutral-800 max-w-2xl text-base sm:text-2xl font-normal mb-12 leading-relaxed drop-shadow-sm">
          Discover our latest collection of unique, handcrafted jewelry made with love, precious gemstones, and absolute precision.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
          <Link
            href="/shop"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center h-14 px-10 bg-gradient-to-r from-primary via-pink-600 to-primary text-white text-base font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(238,43,140,0.4)] hover:shadow-[0_15px_40px_rgba(238,43,140,0.6)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Shop New Collection <RiSparklingLine className="text-lg group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 bg-white/90 hover:bg-white backdrop-blur-md border border-neutral-200 text-neutral-900 text-base font-semibold rounded-full transition-all hover:scale-105 shadow-md"
          >
            Our Artisanal Story
          </Link>
        </div>

        {/* Interactive 3D Stat Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-16 w-full max-w-4xl">
          <Interactive3DCard maxTilt={12} glare={true}>
            <div className="p-5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex items-center gap-4 text-left transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-2xl border border-primary/20">
                <RiSparklingLine />
              </div>
              <div>
                <h4 className="text-neutral-900 font-serif font-semibold text-lg">100% Handcrafted</h4>
                <p className="text-neutral-600 text-xs font-medium">Artisanal Masterpieces</p>
              </div>
            </div>
          </Interactive3DCard>

          <Interactive3DCard maxTilt={12} glare={true}>
            <div className="p-5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex items-center gap-4 text-left transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 text-2xl border border-amber-500/20">
                <RiShieldCheckLine />
              </div>
              <div>
                <h4 className="text-neutral-900 font-serif font-semibold text-lg">Certified Quality</h4>
                <p className="text-neutral-600 text-xs font-medium">Pure Metals & Gems</p>
              </div>
            </div>
          </Interactive3DCard>

          <Interactive3DCard maxTilt={12} glare={true}>
            <div className="p-5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex items-center gap-4 text-left transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 text-2xl border border-blue-500/20">
                <RiTruckLine />
              </div>
              <div>
                <h4 className="text-neutral-900 font-serif font-semibold text-lg">Global Express</h4>
                <p className="text-neutral-600 text-xs font-medium">Insured Safe Delivery</p>
              </div>
            </div>
          </Interactive3DCard>
        </div>
      </motion.div>
    </section>
  );
}
