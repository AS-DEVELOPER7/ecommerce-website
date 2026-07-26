"use client";

import ProductCard from "../../molecules/product/ProductCard";
import Skeleton from "../../atoms/Skeleton";

export default function ProductGrid({ products, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="w-full aspect-[4/5] rounded-3xl mb-4" />
            <Skeleton className="w-3/4 h-6 mx-auto mb-2 rounded-lg" />
            <Skeleton className="w-1/2 h-5 mx-auto rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-24 bg-surface-base/50 rounded-3xl border border-border">
        <h3 className="text-xl font-serif text-neutral-800 mb-2 font-medium">
          No products found
        </h3>
        <p className="text-neutral-500 text-sm">
          Try clearing your active filters or searching for something else.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
