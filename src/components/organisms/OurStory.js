"use client";

import Image from "next/image";
import Link from "next/link";
import { HOME_IMAGES } from "src/constants/images";
import { motion } from "framer-motion";
import Interactive3DCard from "../3d/Interactive3DCard";
import ParticleBackground3D from "../3d/ParticleBackground3D";
import { RiSparklingLine, RiVipDiamondLine, RiHeart3Line } from "react-icons/ri";

export default function OurStory() {
  return (
    <section className="py-16 sm:py-28 bg-gradient-to-b from-[#FDFBF7] via-[#F7F3EB] to-[#FDFBF7] text-neutral-900 relative overflow-hidden px-4">
      {/* Ambient Floating 3D Objects */}
      <ParticleBackground3D />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        {/* Left Side: Interactive 3D Card Image Frame */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <Interactive3DCard maxTilt={12} glare={true}>
            <div className="relative rounded-3xl overflow-hidden border border-white/80 shadow-[0_20px_50px_rgba(238,43,140,0.12)] aspect-4/5 lg:aspect-auto h-96 lg:h-[650px] w-full group">
              <Image
                src={HOME_IMAGES.story}
                alt="Artisan crafting jewelry"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Glassmorphic 3D Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/85 backdrop-blur-xl border border-white shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white text-2xl shadow-md">
                    <RiVipDiamondLine />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-lg text-neutral-900">Artisanal Heritage</h4>
                    <p className="text-neutral-600 text-xs font-medium">Crafted with passion in Sagwara, India</p>
                  </div>
                </div>
              </div>
            </div>
          </Interactive3DCard>
        </motion.div>

        {/* Right Side: Storytelling Text & 3D Feature Grid */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-display uppercase tracking-widest text-xs font-bold mb-6">
            <RiSparklingLine className="text-base animate-pulse" /> Our Heritage
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium mb-8 leading-[1.1] tracking-tight text-neutral-900">
            From Our Artisanal Hands <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary via-pink-600 to-amber-600 bg-clip-text text-transparent">
              Directly to Yours
            </span>
          </h2>

          <p className="text-neutral-700 text-base sm:text-xl font-normal leading-relaxed mb-10 max-w-xl">
            Each creation at Tarmal Creation is more than an accessory—it is a piece of art, forged with love, precision, and authentic craftsmanship to celebrate your unique story.
          </p>

          {/* Craftsmanship Feature Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 w-full">
            <div className="p-4 rounded-2xl bg-white/80 border border-border flex items-center gap-3 shadow-sm">
              <RiSparklingLine className="text-amber-500 text-2xl" />
              <div className="text-left">
                <h5 className="font-serif text-sm font-semibold text-neutral-900">Hand-Selected Gems</h5>
                <p className="text-neutral-500 text-xs">Authentic & Pure</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-border flex items-center gap-3 shadow-sm">
              <RiHeart3Line className="text-primary text-2xl" />
              <div className="text-left">
                <h5 className="font-serif text-sm font-semibold text-neutral-900">Made with Love</h5>
                <p className="text-neutral-500 text-xs">Unmatched Precision</p>
              </div>
            </div>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-primary to-pink-600 hover:from-pink-600 hover:to-primary text-white text-base font-semibold rounded-full shadow-[0_10px_25px_rgba(238,43,140,0.3)] hover:scale-105 transition-all duration-300"
          >
            Read Our Full Story
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
