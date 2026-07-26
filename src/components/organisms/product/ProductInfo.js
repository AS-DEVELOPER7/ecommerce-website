"use client";

import { useState } from "react";
import { useToast } from "../../ui/ToastProvider";
import Button from "../../atoms/Button";
import QuantitySelector from "../../molecules/product/QuantitySelector";
import { RiShoppingBagLine, RiWhatsappLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";
import { motion } from "framer-motion";
import { CURRENCY } from "src/constants";
import ProductShareModal from "./ProductShareModal";

export default function ProductInfo({
  product,
  selectedVariant,
  onSelectVariant,
  selectedSize,
  onSelectSize,
  price,
  qty,
  setQty,
  itemInCart,
  onAdd,
  onRemove,
}) {
  const { show } = useToast();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const rawPrice =
    selectedVariant?.price ?? selectedSize?.price ?? price ?? product.price;
  const parsedPrice = Number(rawPrice);
  const displayPrice =
    !isNaN(parsedPrice) && rawPrice !== null && rawPrice !== undefined
      ? parsedPrice.toFixed(2)
      : "";

  // Active sizes available for current selected variant or product
  const availableSizes =
    selectedVariant?.sizes?.length > 0
      ? selectedVariant.sizes
      : selectedVariant?.size_name
        ? [selectedVariant.size_name]
        : product?.sizes || [];

  const handleAdd = () => {
    onAdd();
    const variantDesc =
      selectedVariant?.name || selectedVariant?.color || selectedVariant?.style;
    show({
      type: "success",
      title: "Added to cart",
      description: `${product.title}${variantDesc ? ` - ${variantDesc}` : ""}`,
    });
  };

  return (
    <div className="flex flex-col py-2 w-full lg:pl-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 mb-5"
      >
        <h1 className="text-3xl sm:text-4xl font-serif font-medium leading-tight text-neutral-900">
          {product.title}
        </h1>
        <div className="text-2xl font-display font-semibold text-primary">
          {displayPrice ? `${displayPrice} ${CURRENCY}` : CURRENCY}
        </div>
      </motion.div>

      {/* Tags */}
      {product.materials?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {product.materials?.map((m) => (
            <span
              key={m}
              className="text-xs font-medium uppercase tracking-widest px-4 py-1.5 rounded-full bg-surface-base text-neutral-600 border border-border"
            >
              {m}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      {product.description && (
        <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-normal">
          {product.description}
        </p>
      )}

      {/* Collection Variants Selection with Preview Image, Title, Color & Sizes */}
      {product.variants?.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-500">
              Select Variant / Item
            </label>
            {selectedVariant?.name && (
              <span className="text-primary font-serif font-semibold text-sm">
                {selectedVariant.name}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {product.variants.map((v, idx) => {
              const isSelected =
                (selectedVariant?.id && v.id && selectedVariant.id === v.id) ||
                (selectedVariant?.name &&
                  v.name &&
                  selectedVariant.name === v.name) ||
                selectedVariant === v ||
                (!selectedVariant && idx === 0);

              const previewImg = v.images?.[0] || product.images?.[0];
              const variantTitle =
                v.name ||
                (Array.isArray(v.color) ? v.color.join(" / ") : v.color) ||
                v.style ||
                `Variant #${idx + 1}`;

              const colorText = Array.isArray(v.color)
                ? v.color.join(" / ")
                : v.color || v.color_names?.join(" / ") || null;

              const sizeText =
                v.sizes?.length > 0 ? v.sizes.join(", ") : v.size_name || null;

              const vPrice = Number(v.price);
              const vPriceFormatted =
                !isNaN(vPrice) && v.price !== null && v.price !== undefined
                  ? vPrice.toFixed(2)
                  : null;

              return (
                <button
                  key={v.id || idx}
                  type="button"
                  onClick={() => onSelectVariant(v)}
                  className={`flex items-center gap-3.5 p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-primary bg-white shadow-md ring-2 ring-primary/30 text-neutral-900 font-semibold"
                      : "border-neutral-200 bg-white/70 text-neutral-700 hover:border-primary/50 hover:bg-white shadow-sm"
                  }`}
                >
                  {previewImg && (
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200 shadow-inner">
                      <img
                        src={previewImg}
                        alt={variantTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs sm:text-sm font-semibold truncate leading-tight">
                      {variantTitle}
                    </span>
                    {(colorText || sizeText) && (
                      <span className="text-[11px] text-neutral-500 font-medium mt-0.5 truncate">
                        {colorText && <span>Color: {colorText}</span>}
                        {colorText && sizeText && <span> • </span>}
                        {sizeText && <span>Sizes: {sizeText}</span>}
                      </span>
                    )}
                    {vPriceFormatted && (
                      <span className="text-[11px] text-primary font-bold mt-0.5">
                        {vPriceFormatted} {CURRENCY}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Sizes for Selected Variant */}
      {availableSizes?.length > 0 && (
        <div className="mb-6">
          <label className="text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-500 mb-3 block">
            Select Size
          </label>
          <div className="flex flex-wrap gap-3">
            {availableSizes.map((s) => {
              const sizeLabel = typeof s === "object" ? s.size : s;
              const isSelected =
                (typeof selectedSize === "object"
                  ? selectedSize?.size
                  : selectedSize) === sizeLabel ||
                (!selectedSize && availableSizes.length === 1);

              return (
                <button
                  key={sizeLabel}
                  type="button"
                  onClick={() => onSelectSize(s)}
                  className={`px-5 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary text-white shadow-md shadow-primary/25"
                      : "border-neutral-300 bg-white/70 text-neutral-700 hover:border-primary hover:text-primary hover:bg-white shadow-sm hover:shadow"
                  }`}
                >
                  {sizeLabel}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="w-full h-px bg-border my-6" />

      {/* Actions */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-[140px] shrink-0">
            <label className="text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-500 mb-3 block">
              Quantity
            </label>
            <QuantitySelector
              quantity={qty}
              onIncrement={() => setQty((q) => Math.min(99, q + 1))}
              onDecrement={() => setQty((q) => Math.max(1, q - 1))}
              className="h-10 sm:h-14 border border-neutral-300 rounded-xl"
            />
          </div>

          <div className="flex-1 flex items-end">
            {product.sold_out ? (
              <Button
                disabled
                className="w-full h-10 sm:h-14 bg-neutral-100 text-neutral-400 border border-neutral-200 shadow-none cursor-not-allowed"
              >
                Sold Out
              </Button>
            ) : itemInCart ? (
              <Button
                onClick={onRemove}
                variant="outline"
                className="w-full h-10 sm:h-14 gap-2 text-danger hover:text-danger hover:border-danger hover:bg-danger/5 border-danger/35 cursor-pointer"
              >
                <HiOutlineTrash className="text-lg sm:text-xl" />
                Remove from Cart
              </Button>
            ) : (
              <Button
                onClick={handleAdd}
                variant="primary"
                className="w-full h-10 sm:h-14 gap-2 shadow-lg shadow-primary/20 text-md sm:text-lg hover:shadow-primary/30 cursor-pointer"
              >
                <RiShoppingBagLine className="text-lg sm:text-xl" />
                Add to Cart
              </Button>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsShareModalOpen(true)}
          className="w-full h-12 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-sm sm:text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 cursor-pointer"
        >
          <RiWhatsappLine className="text-xl sm:text-2xl" />
          <span>Share Product Details with Shopkeeper</span>
        </button>
      </div>

      <ProductShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        product={product}
        selectedVariant={selectedVariant}
        selectedSize={selectedSize}
        price={parsedPrice}
      />
    </div>
  );
}
