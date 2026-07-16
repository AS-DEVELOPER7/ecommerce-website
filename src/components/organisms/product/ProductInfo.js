"use client";

import { useToast } from "../../ui/ToastProvider";
import Button from "../../atoms/Button";
import QuantitySelector from "../../molecules/product/QuantitySelector";
import { RiShoppingBagLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";
import { motion } from "framer-motion";
import { CURRENCY } from "src/constants";

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

  const handleAdd = () => {
    onAdd();
    show({
      type: "success",
      title: "Added to cart",
      description: product.title,
    });
  };
  return (
    <div className="flex flex-col py-2 w-full lg:pl-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-5 mb-5"
      >
        <h1 className="text-3xl sm:text-4xl font-serif font-medium leading-tight  text-base">
          {product.title}
        </h1>
        <div className="text-xl font-display font-medium text-primary ">
          {(price ?? selectedSize?.price ?? product.price)?.toFixed(2)} {CURRENCY}
        </div>
      </motion.div>

      {/* Tags */}
      {product.materials?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {product.materials?.map((m) => (
            <span
              key={m}
              className="text-xs font-medium uppercase tracking-widest px-4 py-1.5 rounded-full bg-surface-base text-muted border border-border"
            >
              {m}
            </span>
          ))}
        </div>
      )}
      {/* Description */}
      {product.description && (
        <p className="text-muted text-sm leading-relaxed mb-5 font-light">
          {product.description}
        </p>
      )}

      {/* Styles Selection */}
      {product.variants?.some((v) => v.style) && (
        <div className="mb-6">
          <label className="text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-500 mb-3 block">
            Select Style
          </label>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((v, idx) => (
              <button
                key={v.style || idx}
                onClick={() => onSelectVariant({ ...v, selectedStyle: v })}
                className={`px-5 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  selectedVariant?.style === v.style
                    ? "border-primary bg-primary text-white shadow-md shadow-primary/25"
                    : "border-neutral-300 bg-white/70 text-neutral-700 hover:border-primary hover:text-primary hover:bg-white shadow-sm hover:shadow"
                }`}
              >
                {v.style}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Colors Selection (Nested or Direct) */}
      {(() => {
        const colorsToShow =
          selectedVariant?.colors ||
          (!product.variants?.some((v) => v.style) ? product.variants : null);

        if (!colorsToShow?.length) return null;

        return (
          <div className="mb-6">
            <label className="text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-500 mb-3 block">
              Select Color
            </label>
            <div className="flex flex-wrap gap-4">
              {colorsToShow.map((c, idx) => {
                const isArrayColor = Array.isArray(c.color);
                const colorLabel = isArrayColor ? c.color.join(" / ") : c.color;

                const hexes = Array.isArray(c.color_hexes)
                  ? c.color_hexes
                  : (c.color_hexes ? [c.color_hexes] : []);

                let backgroundStyle = {};
                if (hexes.length > 1) {
                  backgroundStyle = {
                    background: `conic-gradient(${hexes
                      .map((hex, i) => {
                        const start = (i * 360) / hexes.length;
                        const end = ((i + 1) * 360) / hexes.length;
                        return `${hex} ${start}deg ${end}deg`;
                      })
                      .join(", ")})`,
                  };
                } else if (hexes.length === 1) {
                  const val = hexes[0];
                  if (val.startsWith("linear-gradient") || val.startsWith("conic-gradient")) {
                    backgroundStyle = { background: val };
                  } else {
                    backgroundStyle = { backgroundColor: val };
                  }
                } else {
                  backgroundStyle = { backgroundColor: (c.color || "").toLowerCase() };
                }

                const isSelected =
                  selectedVariant?.selectedColor?.color === c.color ||
                  (!selectedVariant?.selectedColor &&
                    selectedVariant?.color === c.color);

                return (
                  <button
                    key={colorLabel || idx}
                    onClick={() => {
                      if (selectedVariant?.style) {
                        onSelectVariant({
                          ...selectedVariant,
                          selectedColor: c,
                        });
                      } else {
                        onSelectVariant(c);
                      }
                    }}
                    className={`flex items-center gap-3 p-2 pr-5 rounded-full border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border-primary bg-white shadow-sm ring-2 ring-primary/25 ring-offset-1 text-primary font-bold"
                        : "border-neutral-300 bg-white/70 text-neutral-700 hover:border-primary hover:text-primary hover:bg-white shadow-sm hover:shadow"
                    }`}
                  >
                    <span
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-black/10 shadow-inner"
                      style={backgroundStyle}
                    />
                    {colorLabel && (
                      <span className="text-xs sm:text-sm font-medium">
                        {colorLabel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Sizes */}
      {product.sizes?.length > 0 && (
        <div className="mb-6">
          <label className="text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-500 mb-3 block">
            Select Size
          </label>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((s) => {
              const sizeLabel = typeof s === "object" ? s.size : s;
              const isSelected =
                (typeof selectedSize === "object"
                  ? selectedSize?.size
                  : selectedSize) === sizeLabel;

              return (
                <button
                  key={sizeLabel}
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

      <div className="w-full h-px bg-white/40 my-8 border-t border-white/20" />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-[140px] shrink-0">
          <label className="text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-500 mb-3 block">
            Quantity
          </label>
          <QuantitySelector
            quantity={qty}
            onIncrement={() => setQty((q) => Math.min(99, q + 1))}
            onDecrement={() => setQty((q) => Math.max(1, q - 1))}
            className="h-10 sm:h-14 border border-white/60 bg-glass/20 rounded-xl"
          />
        </div>

        <div className="flex-1 flex items-end">
          {product.sold_out ? (
            <Button
              disabled
              className="w-full h-10 sm:h-14 bg-glass/20 text-neutral-400 border border-white/40 shadow-none cursor-not-allowed"
            >
              Sold Out
            </Button>
          ) : itemInCart ? (
            <Button
              onClick={onRemove}
              variant="outline"
              className="w-full h-10 sm:h-14 gap-2 text-danger hover:text-danger hover:border-danger hover:bg-danger/5 border-danger/35"
            >
              <HiOutlineTrash className="text-lg sm:text-xl" />
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={handleAdd}
              variant="primary"
              className="w-full h-10 sm:h-14 gap-2 shadow-lg shadow-primary/20 text-md sm:text-lg hover:shadow-primary/30"
            >
              <RiShoppingBagLine className="text-lg sm:text-xl" />
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
