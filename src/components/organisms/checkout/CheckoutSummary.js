"use client";
import { useMemo } from "react";
import { money } from "src/utils/money";
import ImageWithFallback from "../../molecules/ImageWithFallback";
import { RiShoppingBagLine } from "react-icons/ri";

export default function CheckoutSummary({ items, shippingCharge }) {
  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.price * it.qty, 0),
    [items],
  );
  const shipping = shippingCharge;
  const total = subtotal + shipping;

  return (
    <aside className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-xl h-fit space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-neutral-200/80">
        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg shrink-0">
          <RiShoppingBagLine />
        </div>
        <h3 className="text-xl font-serif font-semibold text-neutral-900">
          Order Summary
        </h3>
      </div>

      <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
        {items.map((it) => {
          const img = it.image || it.images?.[0];
          return (
            <div key={it.cartId || it.id} className="flex items-center gap-3.5 p-2 rounded-2xl bg-neutral-50/60 border border-neutral-100">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                <ImageWithFallback
                  src={img}
                  alt={it.name}
                  fill
                  className="object-contain p-1"
                  sizes="56px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold truncate text-neutral-900">{it.name}</p>
                {it.variantName && (
                  <p className="text-[11px] font-medium text-primary truncate">{it.variantName}</p>
                )}
                {(it.color || it.size) && (
                  <p className="text-[11px] text-neutral-500 truncate">
                    {it.color && <span>{it.color}</span>}
                    {it.color && it.size && <span> • </span>}
                    {it.size && <span>Size: {it.size}</span>}
                  </p>
                )}
                <p className="text-[11px] text-neutral-500 font-medium mt-0.5">Qty: {it.qty}</p>
              </div>
              <p className="text-xs sm:text-sm font-bold text-neutral-900">{money(it.price * it.qty)}</p>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-neutral-200/80 space-y-3 text-xs sm:text-sm">
        <div className="flex justify-between text-neutral-600 font-medium">
          <span>Subtotal</span>
          <span className="font-semibold text-neutral-900">{money(subtotal)}</span>
        </div>
        <div className="flex justify-between text-neutral-600 font-medium">
          <span>Shipping</span>
          <span className="font-semibold text-neutral-900">
            {shipping ? money(shipping) : "Free"}
          </span>
        </div>
        <div className="pt-3 border-t border-neutral-200 flex justify-between text-base sm:text-lg">
          <span className="font-serif font-bold text-neutral-900">Total</span>
          <span className="font-display font-bold text-primary">{money(total)}</span>
        </div>
      </div>
    </aside>
  );
}
