"use client";

import ProductCard from "../molecules/ProductCard";
import Skeleton from "../atoms/Skeleton";

export default function ProductGrid({ isLoading, products }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 justify-items-center">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-full">
            <Skeleton className="w-full aspect-[4/5] rounded-2xl mb-4" />
            <Skeleton className="w-3/4 h-6 mx-auto mb-2" />
            <Skeleton className="w-1/2 h-5 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 bg-surface rounded-2xl border border-border border-dashed">
        <h3 className="text-2xl font-serif text-base mb-2">
          No products found
        </h3>
        <p className="text-muted">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12 justify-items-center">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
