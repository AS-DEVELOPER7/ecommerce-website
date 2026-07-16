"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCategory } from "src/services/reducers/generalReducer";
import { useGetCategoriesQuery } from "src/services/api/productsApi";
import { motion } from "framer-motion";

export default function ExploreCollection() {
  const dispatch = useDispatch();
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return (
    <section className="py-10 sm:py-20 bg-surface-base/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-end mb-8 gap-6">
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-primary font-display uppercase tracking-widest text-xs sm:text-sm font-semibold">
              Curated for you
            </span>
            <h2 className="text-2xl sm:text-5xl font-serif font-medium mt-4">
              Explore Collections
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-primary self-end text-xs sm:text-sm font-medium hover:underline underline-offset-4 decoration-primary/30"
          >
            View All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-neutral-200 animate-pulse"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                </div>
              ))
            : categories.map((c, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  key={c.id || c.name}
                >
                  <Link
                    href="/shop"
                    onClick={() => dispatch(setCategory(c.name))}
                    className="group flex flex-col block"
                  >
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-square bg-surface-base/30 border border-white/60 shadow-glass transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-md">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                        style={{
                          backgroundImage: `url(${c.image_url || "/placeholder-category.jpg"})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-black/[0.08] transition-colors duration-500" />
                    </div>
                    
                    <div className="mt-3 text-center px-2">
                      <h3 className="font-serif text-sm sm:text-base font-medium text-neutral-800 group-hover:text-primary transition-colors tracking-wide">
                        {c.name}
                      </h3>
                      <span className="text-primary font-display text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider block mt-1">
                        View Products →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
