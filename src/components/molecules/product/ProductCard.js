// src/components/molecules/product/ProductCard.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "src/services/reducers/cartReducer";
import { RiShoppingBagLine, RiWhatsappLine } from "react-icons/ri";
import { useToast } from "../../ui/ToastProvider";
import { CURRENCY } from "src/constants";
import ImageWithFallback from "../ImageWithFallback";
import { motion } from "framer-motion";
import ProductShareModal from "../../organisms/product/ProductShareModal";
import Interactive3DCard from "../../3d/Interactive3DCard";
import { shareToWhatsApp } from "src/utils/whatsappShare";

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

  // Auto-select 1st variant, 1st size, and 1st preview image
  const defaultVariant = variants?.[0] || null;
  const defaultVariantName = defaultVariant?.name || null;
  const defaultColor = defaultVariant?.color || (Array.isArray(defaultVariant?.color_names) ? defaultVariant.color_names.join(" / ") : null);
  
  const rawSize = defaultVariant?.sizes?.[0] || defaultVariant?.size_name || sizes?.[0] || null;
  const finalSizeLabel = typeof rawSize === "object" ? rawSize?.size : rawSize;

  // Fallback to find any valid price across variant, size, product, or fallback 0
  const rawPrice =
    defaultVariant?.price ??
    (typeof rawSize === "object" ? rawSize?.price : null) ??
    price ??
    variants?.find((v) => v.price !== null && v.price !== undefined)?.price ??
    0;

  const parsedPrice = Number(rawPrice);
  const finalPrice = !isNaN(parsedPrice) ? parsedPrice : 0;
  const displayPrice = finalPrice.toFixed(2);

  const primaryImage = defaultVariant?.images?.[0] || images?.[0] || product.image;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (soldOut) return;

    dispatch(
      addToCart({
        id,
        name,
        variantName: defaultVariantName,
        color: defaultColor,
        size: finalSizeLabel,
        image: primaryImage,
        price: finalPrice,
        soldOut: Boolean(soldOut),
        qty: 1,
      }),
    );

    const descLabel = defaultVariantName ? `${name} - ${defaultVariantName}` : defaultColor ? `${name} - ${defaultColor}` : name;

    show({
      type: "success",
      title: "Added to cart",
      description: `${descLabel}${finalSizeLabel ? ` (${finalSizeLabel})` : ""}`,
    });
  };

  const handleWhatsAppShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShareModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col"
      >
        <Interactive3DCard maxTilt={12} glare={true}>
          {/* Card Surface Container */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-base border border-border/80 shadow-md group/card flex flex-col h-full transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(238,43,140,0.12)]">
            
            {/* Image Container */}
            <div className="relative aspect-4/5 overflow-hidden block w-full bg-gradient-to-b from-neutral-100/50 to-neutral-200/50 dark:from-neutral-900 dark:to-neutral-950">
              
              {/* Product Image Link */}
              <Link
                href={`/product/${id}`}
                className="absolute inset-0 z-10 block w-full h-full cursor-pointer"
              >
                <div className="relative w-full h-full transform transition-transform duration-700 ease-out group-hover/card:scale-110 group-hover/card:translate-z-20">
                  <ImageWithFallback
                    src={primaryImage}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={`object-contain p-4 ${
                      soldOut ? "opacity-60 grayscale" : ""
                    }`}
                  />
                </div>
              </Link>

              {soldOut && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center font-display tracking-widest uppercase text-xs text-white font-semibold backdrop-blur-sm z-20 pointer-events-none">
                  Sold Out
                </div>
              )}

              {/* Quick WhatsApp Share Badge - Elevated on z-50 with pointer-events-auto */}
              <div
                className="absolute top-3 right-3 z-50 pointer-events-auto"
                style={{ transform: "translateZ(50px)" }}
              >
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  title="Share product details to WhatsApp"
                  className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer relative z-50"
                >
                  <RiWhatsappLine className="text-xl pointer-events-none" />
                </button>
              </div>

              {/* Hover Overlay + Quick Add Button - Overlay is pointer-events-none so click passes through to Link */}
              {!soldOut && (
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 px-4 z-40 pointer-events-none"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="w-full bg-white/95 hover:bg-primary text-neutral-900 hover:text-white backdrop-blur-md text-base font-semibold py-3 rounded-xl shadow-xl transform translate-y-4 group-hover/card:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer pointer-events-auto relative z-50"
                  >
                    <RiShoppingBagLine className="text-lg pointer-events-none" /> Quick Add
                  </button>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col text-center p-4 bg-surface/80 backdrop-blur-sm relative z-20">
              <Link href={`/product/${id}`} className="cursor-pointer">
                <h3 className="font-serif text-lg leading-tight mb-2 hover:text-primary transition-colors line-clamp-1">
                  {name}
                </h3>
              </Link>
              <p className="text-primary font-display font-semibold text-base">
                {displayPrice} {CURRENCY}
              </p>
            </div>
          </div>
        </Interactive3DCard>
      </motion.div>

      {/* Product Share Modal */}
      <ProductShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        product={product}
        selectedVariant={defaultVariant}
        selectedSize={rawSize}
        price={finalPrice}
      />
    </>
  );
}
