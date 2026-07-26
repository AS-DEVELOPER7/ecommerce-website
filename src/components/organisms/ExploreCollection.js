"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCategory } from "src/services/reducers/generalReducer";
import { motion } from "framer-motion";
import { useGetCategoriesQuery } from "src/services/api/productsApi";
import Interactive3DCard from "../3d/Interactive3DCard";
import ParticleBackground3D from "../3d/ParticleBackground3D";
import { RiArrowRightLine, RiSparklingLine } from "react-icons/ri";

export default function ExploreCollection() {
  const dispatch = useDispatch();
  const { data: categories = [], isLoading } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <section className="py-12 sm:py-24 bg-surface-base/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-end mb-12 gap-6">
            <div className="flex flex-col items-center sm:items-start space-y-3">
              <div className="h-4 w-32 bg-neutral-200 animate-pulse rounded-full" />
              <div className="h-10 w-72 bg-neutral-200 animate-pulse rounded-xl" />
            </div>
            <div className="h-4 w-36 bg-neutral-200 animate-pulse rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-3xl bg-neutral-200 animate-pulse aspect-[4/5] w-full"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-24 bg-gradient-to-b from-[#FDFBF7] via-[#F7F3EB] to-[#FDFBF7] relative overflow-hidden">
      {/* Ambient Floating 3D Objects */}
      <ParticleBackground3D />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-end mb-12 gap-6">
          <div className="flex flex-col items-center sm:items-start">
            <span className="inline-flex items-center gap-1.5 text-primary font-display uppercase tracking-widest text-xs sm:text-sm font-bold mb-2">
              <RiSparklingLine className="text-base" /> Curated Collections
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-neutral-900">
              Explore Craftsmanship
            </h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-primary font-semibold text-sm sm:text-base hover:gap-3 transition-all underline-offset-8 decoration-primary/40"
          >
            View All Categories <RiArrowRightLine className="text-lg group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((c, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              key={c.id || i}
            >
              <Interactive3DCard maxTilt={12} glare={true}>
                <Link
                  href="/shop"
                  onClick={() => dispatch(setCategory(c.name))}
                  className="group relative rounded-3xl overflow-hidden aspect-[4/5] block border border-white shadow-lg transition-all duration-500 hover:shadow-[0_25px_50px_rgba(238,43,140,0.2)]"
                >
                  {/* Category Image with Scale */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${c.image_url})` }}
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Glassmorphic Card Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 z-10">
                    <span className="text-xs uppercase tracking-widest text-primary font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Handmade
                    </span>
                    <h3 className="text-white text-xl sm:text-3xl font-serif font-medium mb-3 group-hover:text-amber-200 transition-colors drop-shadow-md">
                      {c.name}
                    </h3>
                    <div className="inline-flex items-center gap-2 text-white/90 font-display text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 uppercase tracking-wider">
                      Shop Category <RiArrowRightLine className="text-base group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </Interactive3DCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
