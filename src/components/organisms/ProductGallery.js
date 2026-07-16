"use client";

import { useState, useEffect, useMemo } from "react";
import ImageWithFallback from "../molecules/ImageWithFallback";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductGallery({
  product,
  selectedVariant,
  onSelectVariant,
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const images = useMemo(() => {
    if (selectedVariant?.selectedColor?.images?.length)
      return selectedVariant.selectedColor.images;
    if (selectedVariant?.images?.length) return selectedVariant.images;
    if (selectedVariant?.selectedStyle?.images?.length)
      return selectedVariant.selectedStyle.images;
    return product?.images || [];
  }, [selectedVariant, product]);

  const mainImg = images[activeIdx] || images[0];

  useEffect(() => {
    setActiveIdx(0);
  }, [selectedVariant]);
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Main Image */}
      <div
        className="relative group overflow-hidden rounded-2xl aspect-square sm:aspect-square bg-surface-base w-full h-[400px] sm:h-[500px] shadow-sm cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mainImg || "fallback"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <div
              className="relative w-full h-full transition-transform duration-200 ease-out"
              style={{
                transform: isZooming ? "scale(2)" : "scale(1)",
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              }}
            >
              <ImageWithFallback
                src={mainImg}
                alt={product?.title || "Product Image"}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5 rounded-2xl" />

        {product?.sold_out && (
          <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full backdrop-blur-md bg-opacity-80">
            Sold Out
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-7  gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                i === activeIdx
                  ? "border-primary shadow-md scale-105"
                  : "border-transparent hover:border-primary/50 opacity-70 hover:opacity-100"
              }`}
              aria-label={`View thumbnail ${i + 1}`}
            >
              <ImageWithFallback
                src={src}
                alt={`${product?.title} thumbnail ${i + 1}`}
                fill
                className="object-contain bg-surface-base"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
