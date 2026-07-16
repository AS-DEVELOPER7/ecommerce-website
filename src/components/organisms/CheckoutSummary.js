"use client";
import { useMemo } from "react";
import Image from "next/image";
import { money } from "src/utils/money";
import { SHIPPING_THRESHOLD } from "src/constants";
import ImageWithFallback from "../molecules/ImageWithFallback";

export default function CheckoutSummary({ items, shippingCharge }) {
  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.price * it.qty, 0),
    [items],
  );
  const shipping = shippingCharge;
  const total = subtotal + shipping;

  return (
    <aside className="bg-surface rounded-2xl p-5 border border-border h-fit">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      <div className="space-y-4">
        {items.map((it) => {
          const img = it.image || it.images?.[0];
          return (
            <div key={it.cartId || it.id} className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={img}
                  alt={it.name}
                  fill
                  className="object-contain! bg-surface-base"
                  sizes="56px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{it.name}</p>
                {it.color && (
                  <p className="text-xs text-muted">Color: {it.color}</p>
                )}
                {it.size && (
                  <p className="text-xs text-muted">Size: {it.size}</p>
                )}
                <p className="text-xs text-muted">Qty: {it.qty}</p>
              </div>
              <p className="text-sm font-semibold">{money(it.price)}</p>
            </div>
          );
        })}
      </div>

      <div className="my-4 border-t border-border" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <span className="font-medium">{money(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Shipping</span>
          <span className="font-medium">
            {shipping ? money(shipping) : "Free"}
          </span>
        </div>
      </div>

      <div className="my-4 border-t border-border" />

      <div className="flex justify-between text-base">
        <span className="font-semibold">Total</span>
        <span className="font-semibold">{money(total)}</span>
      </div>
    </aside>
  );
}
