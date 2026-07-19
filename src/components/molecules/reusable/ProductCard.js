// src/components/molecules/ProductCard.js
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "src/services/reducers/cartReducer";
import { RiShoppingBagLine, RiWhatsappLine } from "react-icons/ri";
import { useToast } from "../../ui/ToastProvider";
import { CURRENCY } from "src/constants";
import ImageWithFallback from "./ImageWithFallback";
import { motion } from "framer-motion";
import ProductShareModal from "../../organisms/product/ProductShareModal";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { show } = useToast();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  if (!product) return null;

  const {
    id,
    title: name,
    price,
    sold_out: soldOut,
    images,
    sizes,
    variants,
  } = product;
  const image = images?.[0] || product.image;

  const defaultColor = variants?.[0]?.color || null;
  const defaultSizeData = sizes?.[0] || null;

  const finalSizeLabel =
    defaultSizeData && typeof defaultSizeData === "object"
      ? defaultSizeData.size
      : defaultSizeData;

  const finalPrice =
    defaultSizeData && typeof defaultSizeData === "object"
      ? defaultSizeData.price ?? price
      : price;

  const handleAdd = (e) => {
    e.preventDefault();
    if (soldOut) return;

    dispatch(
      addToCart({
        id,
        name,
        color: defaultColor,
        size: finalSizeLabel,
        image: image,
        price: finalPrice,
        soldOut,
        qty: 1,
      }),
    );

    const colorDesc = Array.isArray(defaultColor)
      ? defaultColor.join(" / ")
      : defaultColor;

    show({
      type: "success",
      title: "Added to cart",
      description: `${name}${colorDesc ? ` - ${colorDesc}` : ""}${
        finalSizeLabel ? ` (${finalSizeLabel})` : ""
      }`,
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group w-full flex flex-col bg-glass/45 backdrop-blur-md border border-white/60 shadow-glass rounded-3xl p-3 sm:p-4 transition-all duration-500 hover:bg-glass/70 hover:border-white/85 hover:-translate-y-1 hover:shadow-lg"
      >
        {/* Image Container */}
        <Link
          href={`/product/${id}`}
          className="relative aspect-4/5 overflow-hidden rounded-2xl bg-surface-base/30 block"
        >
          <ImageWithFallback
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-contain p-2 transition-transform duration-1000 ease-out group-hover:scale-105 ${
              soldOut ? "opacity-60 grayscale" : ""
            }`}
          />
          {soldOut && (
            <div className="absolute inset-0 bg-black/45 flex items-center justify-center font-display tracking-widest uppercase text-xs text-white font-semibold backdrop-blur-sm">
              Sold Out
            </div>
          )}

          {/* Quick WhatsApp Share badge button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsShareModalOpen(true);
            }}
            title="Share product screenshot to WhatsApp"
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-md hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <RiWhatsappLine className="text-xl" />
          </button>

          {/* Hover overlay + Add to cart button */}
          {!soldOut && (
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3 px-3">
              <button
                onClick={handleAdd}
                className="w-full bg-primary text-white backdrop-blur-md font-semibold py-2.5 rounded-xl shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 flex items-center justify-center gap-2 hover:bg-secondary"
              >
                <RiShoppingBagLine className="text-md" /> Add to Bag
              </button>
            </div>
          )}
        </Link>

        {/* Info */}
        <div className="flex flex-col text-center px-1 mt-2">
          <Link href={`/product/${id}`}>
            <h3 className="font-serif text-sm sm:text-md font-medium text-neutral-800 leading-snug mb-1 hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>
          <p className="text-primary font-display font-semibold text-xs sm:text-sm">
            {finalPrice?.toFixed(2)} {CURRENCY}
          </p>
        </div>
      </motion.div>

      <ProductShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        product={product}
        selectedVariant={variants?.[0] || null}
        selectedSize={defaultSizeData}
        price={finalPrice}
      />
    </>
  );
}
