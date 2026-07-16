"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetFeaturedProductsQuery } from "src/services/api/productsApi";
import ProductCard from "../molecules/ProductCard";
import Skeleton from "../atoms/Skeleton";

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
    <section className="py-10 sm:py-20 bg-bg px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-primary font-display uppercase tracking-widest text-xs sm:text-sm font-semibold">
            Exquisite Pieces
          </span>
          <h2 className="text-2xl sm:text-5xl font-serif font-medium mt-4">
            Our Most Loved
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  // className="shrink-0 w-[280px] sm:w-[320px] snap-center"
                >
                  <Skeleton className="w-full aspect-[4/5] rounded-2xl mb-4" />
                  <Skeleton className="w-3/4 h-6 mx-auto mb-2" />
                  <Skeleton className="w-1/2 h-5 mx-auto" />
                </div>
              ))
            : featuredProducts.map((product) => (
                <div
                  key={product.id}
                  // className="shrink-0 w-[280px] sm:w-[320px] snap-center"
                >
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
