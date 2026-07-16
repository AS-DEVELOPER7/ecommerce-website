"use client";
import Link from "next/link";
import { CURRENCY, SHIPPING_THRESHOLD } from "src/constants";

export default function CartSummary({
  items,
  subtotal,
  shipping,
  discount,
  total,
  promo,
  setPromo,
}) {
  return (
    <aside className="bg-white rounded-xl p-4 sm:p-6 h-fit shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      {/* Promo code (local only) */}
      {/* <div className="mb-4">
        <label htmlFor="promo" className="text-sm text-muted block mb-1">
          Promo code
        </label>
        <div className="flex gap-2">
          <input
            id="promo"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="Enter code"
            className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
          />
          <button
            className="px-4 rounded-md border border-border text-sm hover:border-primary hover:text-primary"
            onClick={() => {}}
            type="button"
          >
            Apply
          </button>
        </div>
      </div> */}

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <span className="font-medium text-base">
            {subtotal.toFixed(2)} {CURRENCY}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Shipping</span>
          <span className="font-medium text-base">
            {shipping === 0 ? "Free" : `${shipping.toFixed(2)} ${CURRENCY}`}
          </span>
        </div>
        {/* <div className="flex justify-between">
          <span className="text-muted">Discount</span>
          <span className="font-medium text-base">
            {discount > 0 ? `-${discount.toFixed(2)}` : "0.00 "} {CURRENCY}
          </span>
        </div> */}
        <div className="border-t border-border my-3" />
        <div className="flex justify-between text-base">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">
            {total.toFixed(2)} {CURRENCY}
          </span>
        </div>
      </div>

      <Link
        href="/checkout"
        className={`mt-6 inline-flex w-full h-11 items-center justify-center rounded-full bg-primary text-white font-semibold hover:opacity-90 ${
          items.some((i) => i.soldOut) ? "opacity-60 pointer-events-none" : ""
        }`}
        title={
          items.some((i) => i.soldOut)
            ? "Remove sold-out items to proceed"
            : "Proceed to checkout"
        }
      >
        Proceed to Checkout
      </Link>

      <p className="mt-3 text-xs text-muted">
        {subtotal >= SHIPPING_THRESHOLD
          ? "You’ve unlocked free shipping!"
          : `Add more items worth ${(SHIPPING_THRESHOLD - subtotal).toFixed(
              2
            )} ${CURRENCY} total to get free shipping.`}
      </p>
      <p className="mt-2 text-xs text-primary/80 font-medium italic">
        * Standard delivery is free within Sagwara city.
      </p>
    </aside>
  );
}
