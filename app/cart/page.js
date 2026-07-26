"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../src/services/reducers/cartReducer";
import { SHIPPING_THRESHOLD, SHIPPING_COST } from "src/constants";

import { RiArrowLeftSLine, RiSparklingLine } from "react-icons/ri";

import CartRow from "src/components/molecules/cart/CartRow";
import EmptyCart from "src/components/molecules/cart/EmptyCart";
import CartSummary from "src/components/organisms/cart/CartSummary";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart?.items ?? []);
  const [promo, setPromo] = useState("");

  const { subtotal, shipping, discount, total } = useMemo(() => {
    const subtotal = items.reduce(
      (acc, it) => acc + Number(it.price) * Number(it.qty),
      0
    );
    const shipping = subtotal === 0 ? 0 : subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const discount = 0;
    const total = Math.max(0, subtotal + shipping - discount);
    return { subtotal, shipping, discount, total };
  }, [items]);

  const inc = (it) =>
    dispatch(updateQuantity({ cartId: it.cartId, qty: it.qty + 1 }));

  const dec = (it) => {
    const next = it.qty - 1;
    if (next <= 0) {
      dispatch(removeFromCart(it.cartId));
    } else {
      dispatch(updateQuantity({ cartId: it.cartId, qty: next }));
    }
  };

  const remove = (it) => dispatch(removeFromCart(it.cartId));
  const clear = () => dispatch(clearCart());

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-neutral-900 px-4 sm:px-8 py-10 sm:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-primary font-display uppercase tracking-widest text-xs font-bold mb-1">
              <RiSparklingLine className="text-base animate-pulse" /> Shopping Bag
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-medium">Your Cart</h1>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-primary font-medium transition-colors cursor-pointer"
          >
            <RiArrowLeftSLine className="text-lg" />
            Continue shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* Left: items */}
            <section className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-[0_15px_35px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <p className="text-sm text-neutral-600 font-medium">
                  {items.length} {items.length === 1 ? "item" : "items"} in your cart
                </p>
                <button
                  type="button"
                  onClick={clear}
                  className="text-sm text-neutral-500 hover:text-primary transition-colors font-medium cursor-pointer"
                >
                  Clear cart
                </button>
              </div>

              <div className="space-y-6">
                {items.map((it) => (
                  <CartRow
                    key={it.cartId}
                    item={it}
                    onInc={() => inc(it)}
                    onDec={() => dec(it)}
                    onRemove={() => remove(it)}
                  />
                ))}
              </div>
            </section>

            {/* Right: summary */}
            <CartSummary
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              total={total}
              promo={promo}
              setPromo={setPromo}
            />
          </div>
        )}
      </div>
    </main>
  );
}
