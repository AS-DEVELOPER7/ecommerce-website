"use client";

import { useEffect, useState } from "react";
import { useLazyGetFeaturedProductsQuery } from "src/services/api/productsApi";
import ProductCard from "../../molecules/product/ProductCard";
import Skeleton from "../../atoms/Skeleton";
import ParticleBackground3D from "../../3d/ParticleBackground3D";
import { RiSparklingLine } from "react-icons/ri";

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [fetchFeatured, { isLoading }] = useLazyGetFeaturedProductsQuery();

  useEffect(() => {
    const loadFeatured = async () => {
      const { data } = await fetchFeatured();
      if (data) setFeaturedProducts(data);
    };
    loadFeatured();
  }, [fetchFeatured]);

  return (
    <section className="py-12 sm:py-24 bg-[#FDFBF7] relative overflow-hidden px-4">
      {/* Ambient Floating 3D Objects */}
      <ParticleBackground3D />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-primary font-display uppercase tracking-widest text-xs sm:text-sm font-bold mb-2">
            <RiSparklingLine className="text-base animate-pulse" /> Exquisite Creations
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium mt-2 text-neutral-900 tracking-tight">
            Our Most Loved Collections
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="w-full aspect-[4/5] rounded-3xl mb-4" />
                  <Skeleton className="w-3/4 h-6 mx-auto mb-2 rounded-lg" />
                  <Skeleton className="w-1/2 h-5 mx-auto rounded-lg" />
                </div>
              ))
            : featuredProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
