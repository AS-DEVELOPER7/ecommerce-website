"use client";

import Link from "next/link";
import Image from "next/image";
import { FaLock } from "react-icons/fa";
import { money } from "src/utils/money";
import ImageWithFallback from "../molecules/ImageWithFallback";

export default function ReviewOrderDetails({
  setStep,
  addr,
  payMethod,
  items,
  placeOrder,
  sending,
}) {
  return (
    <>
      <h2 className="text-2xl md:text-3xl font-black">Review Your Order</h2>

      {/* Address */}
      <div className="rounded-2xl border border-border p-5 bg-surface">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Shipping Address</p>
          <button onClick={() => setStep(1)} className="text-primary text-sm">
            Edit
          </button>
        </div>
        <div className="mt-2 text-sm text-muted leading-6">
          <div className="text-black font-medium">{addr.name || "-"}</div>
          <div>{addr.street || "-"}</div>
          <div>
            {addr.city || "-"}
            {addr.state ? `, ${addr.state}` : ""}
            {addr.zip ? `, ${addr.zip}` : ""}
          </div>
          <div>{addr.email || "-"}</div>
          {addr.phone && <div>{addr.phone}</div>}
        </div>
      </div>

      {/* Payment */}
      <div className="rounded-2xl border border-border p-5 bg-surface">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Payment Method</p>
          <button onClick={() => setStep(2)} className="text-primary text-sm">
            Edit
          </button>
        </div>
        <div className="mt-2 text-sm text-muted capitalize">{payMethod}</div>
      </div>

      {/* Items */}
      <div className="rounded-2xl border border-border p-5 bg-surface">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Items in Order</p>
          <Link href="/cart" className="text-primary text-sm">
            Edit
          </Link>
        </div>
        <div className="mt-3 space-y-3">
          {items.map((it) => {
            const img = it.image || it.images?.[0];
            return (
              <div key={it.cartId || it.id} className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={img}
                    alt={it.name}
                    fill
                    className="object-contain! bg-surface-base"
                    sizes="48px"
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
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
        <button
          onClick={() => setStep(2)}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary"
        >
          ← Return to Payment
        </button>
        <button
          onClick={placeOrder}
          disabled={sending}
          className="h-11 px-6 rounded-xl text-xs text-white font-bold inline-flex items-center gap-2 bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{sending ? "Placing Order..." : "Place Order"}</span>
          {!sending && <FaLock />}
        </button>
      </div>
    </>
  );
}
