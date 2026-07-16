"use client";

import Image from "next/image";
import Link from "next/link";
import { HOME_IMAGES } from "src/constants/images";
import { motion } from "framer-motion";
import Button from "../atoms/Button";

export default function OurStory() {
  return (
    <section className="py-10  bg-bg overflow-hidden px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden aspect-4/5 lg:aspect-auto h-96 lg:h-[700px] w-full"
        >
          <Image
            src={HOME_IMAGES.story}
            alt="Artisan crafting jewelry"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <span className="text-primary font-display uppercase tracking-widest text-xs sm:text-sm font-semibold mb-4">
            Our Heritage
          </span>
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-serif font-medium mb-8 leading-tight">
            From Our Hands
            <br />
            to Yours
          </h2>
          <p className="text-muted text-sm sm:text-lg leading-relaxed mb-10 max-w-xl">
            Each piece at Tarmal Creation is more than just an accessory; it is
            a story of passion and meticulous craftsmanship. Every design is
            brought to life with love, blending traditional techniques with
            modern aesthetics to create timeless elegance.
          </p>
          <Link href="/about">
            <Button variant="outline" className="px-8 rounded-full">
              Read Our Story
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
