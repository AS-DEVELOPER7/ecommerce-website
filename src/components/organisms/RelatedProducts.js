"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ProductCard from "../molecules/ProductCard";

export default function RelatedProducts({ related }) {
  if (!related || related.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto mt-8 mb-8 px-4">
      <div className="text-center mb-12">
        <h3 className="text-xl sm:text-3xl font-serif font-medium">
          You Might Also Like
        </h3>
        <div className="w-16 h-1 bg-primary mx-auto mt-6 rounded-full opacity-50" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {related.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="w-full"
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
