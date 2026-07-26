"use client";

import ProductCard from "../../molecules/product/ProductCard";

export default function RelatedProducts({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-24 pt-16 border-t border-border">
      <h2 className="text-2xl sm:text-3xl font-serif text-center font-medium text-neutral-900 mb-12">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
